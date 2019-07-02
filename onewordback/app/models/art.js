const { flatten } = require("lodash")

const { Op } = require("sequelize")

const { Movie, Sentence, Music } = require("./classic")

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail(uid) {
    const { Favor } = require("./favor")
    const art = await Art.getData(this.art_id, this.type)
    if (!art) {
      throw new global.errs.NotFound()
    }

    const like = await Favor.userLikeIt(this.art_id, this.type, uid)
    // art.setDataValue('like_status',like)
    return {
      art,
      like_status: like
    }
  }

  // 获取所有期刊，参数是一个数组
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    //  for of遍历数组 往artInfoObj对象的每一个数组中添加对应的id
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    //  for in 遍历artInfoObj对象
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }

      // key 转型为int，因为_getListByType方法的参数要求字符串
      key = parseInt(key)
      //   往数组里添加数据数组
      arts.push(await Art._getListByType(ids, key))
    }
    // 将二维数组展开为一维数组，使用loadsh flatten函数
    return flatten(arts)
  }

  // 根据id数组和类型来查询数据，返回一个数组
  static async _getListByType(ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    const scope = "bh"
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder)
        break
      case 200:
        arts = await Music.scope(scope).findAll(finder)
        break
      case 300:
        arts = await Sentence.scope(scope).findAll(finder)
      case 400:
        break
      default:
        break
    }
    return arts
  }

  static async getData(art_id, type, useScope = true) {
    let art = null
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = useScope ? "bh" : null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
      case 400:
        break
      default:
        break
    }
    return art
  }
}

module.exports = {
  Art
}
