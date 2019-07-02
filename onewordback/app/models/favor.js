const { sequelize } = require("../../core/db")
const { Sequelize, Model, Op } = require("sequelize")
const { Art } = require("./art")

class Favor extends Model {
  // 业务表

  static async like(art_id, type, uid) {
    //   如果在favor表中查到已经点赞了  抛出异常
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    // 执行事务，事务操作要么全部执行，要么就取消。保持数据一致性，避免问题
    return sequelize.transaction(async t => {
      // 在喜欢表中加一条喜欢的数据
      await Favor.create(
        {
          art_id,
          type,
          uid
        },
        {
          transaction: t
        }
      )
      //   查询导数据项后，该项的喜欢字段数值加1
      const art = await Art.getData(art_id, type, false)
      await art.increment("fav_nums", {
        by: 1,
        transaction: t
      })
    })
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DislikeError()
    }
    // Favor 表 favor 记录
    return sequelize.transaction(async t => {
      // 直接destory查询到的数据
      await favor.destroy({
        // 物理删除， force: false软删除,
        force: true,
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      await art.decrement("fav_nums", {
        by: 1,
        transaction: t
      })
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id,
        type
      }
    })
    return favor ? true : false
  }

  static async getMyClassicFavors(uid) {
    //  查询到所有我喜欢的期刊，不包含数据 [Op.not]: 400
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          // 不等于
          [Op.not]: 400
        }
      }
    })
    if (!arts) {
      throw new global.errs.NotFound()
    }

    // 返回期刊数据
    return await Art.getList(arts)
  }

  static async getBookFavor(uid, bookID) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookID,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookID,
        uid,
        type: 400
      }
    })
    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    }
  }
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: "favor"
  }
)

module.exports = {
  Favor
}
