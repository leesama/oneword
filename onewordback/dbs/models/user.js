const { sequelize } = require('../db')
const { unset } = require('lodash')
const { Book } = require('./book')
const { Card } = require('./card')
const fs = require('fs')
const { Sequelize, Model } = require('sequelize')

// define
class User extends Model {
  /**
   * @description: 创建数据，并为用户初始化Book数据
   * @param {type}
   * @return:
   */
  static async createUserAndInitData(username, password, email) {
    const nuser = await User.create({ username, password, email })
    return await nuser.createBook({ bookname: '默认文集' })
  }
  /**
   * @description:
   * @param {type}
   * @return:
   */
  static async getUserInfoAndBookList(uid) {
    const data = await User.findOne({
      include: [Book],
      where: {
        uid
      }
    })
    // 拼接数据
    // 得到book数据
    const booklist = data.getDataValue('books')
    // data中原本的book删除掉，
    unset(data.dataValues, 'books')
    // 得到取出book后序列化后的数据
    const user = data.toJSON()
    // 拼凑在一起
    return { user, booklist }
  }
  /**
   * @description: 要更新的字段中包含图片
   * @param {type}
   * @return:
   */
  static async updateHasImg(uid, updateObj) {
    const originalPicPath = (await User.findOne({ where: { uid } })).smallavatar
    const userUpdated = await User.update(updateObj, { where: { uid } })
    // 图片路径保存到服务器成功后，删除之前的图片
    if (userUpdated) {
      if (originalPicPath) {
        fs.unlink(originalPicPath, function(error) {
          if (error) {
            console.log(error)
            return false
          }
          console.log('删除文件成功')
        })
      }
      return userUpdated
    }
  }
  /**
   * @description: 要跟新的字段中不包含图片
   * @param {type}
   * @return:
   */
  static async updateNoImg(uid, updateObj) {
    // 更新数据
    const userUpdated = await User.update(updateObj, { where: { uid } })
    if (userUpdated) {
      return userUpdated
    }
  }
}
User.prototype.exclude = ['password', 'email']
User.init(
  {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    followcnt: {
      type: Sequelize.INTEGER,
      defaultValue: 666
    },
    fanscnt: {
      type: Sequelize.INTEGER,
      defaultValue: 666
    },
    intro: {
      type: Sequelize.STRING
    },
    smallavatar: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'user'
  }
)
module.exports = {
  User
}
