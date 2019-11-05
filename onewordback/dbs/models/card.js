const { sequelize } = require('../db')
const { unset } = require('lodash')
const { Sequelize, Model, Op } = require('sequelize')
const moment = require('moment')
// define
class Card extends Model {
  static async findCardsLteTime(time) {
    const cardInfo = await Card.findAll({
      where: {
        datetime: {
          [Op.lte]: moment(time).format()
        }
      },
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }
  static async findCards() {
    const cardInfo = await Card.findAll({
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }

  static async findTextCardsLteTime(time) {
    const cardInfo = await Card.findAll({
      where: {
        datetime: {
          [Op.lte]: moment(time).format()
        },
        category: { [Op.ne]: '2000' }
      },
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }
  static async findTextCards() {
    const cardInfo = await Card.findAll({
      where: {
        category: { [Op.ne]: '2000' }
      },
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }

  static async findCardsLteTimeByQuery(query, time) {
    const cardInfo = await Card.findAll({
      where: {
        datetime: {
          [Op.lte]: moment(time).format()
        },
        ...query
      },
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }
  static async findCardsByQuery(query) {
    const cardInfo = await Card.findAll({
      where: query,
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['book_bookid', 'bookBookid', 'user_uid'] },
      include: ['originbook', 'creator']
    })
    return cardInfo
  }
}
Card.init(
  {
    textcardid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    picpath: {
      type: Sequelize.STRING
    },
    commentcnt: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    from: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    collectcnt: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    replycnt: { type: Sequelize.INTEGER, defaultValue: 0 },
    dislikecnt: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    content: {
      type: Sequelize.STRING
    },
    musicurl: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    original: { type: Sequelize.STRING },
    musicurl: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'card',
    modelName: 'card'
  }
)
Card.prototype.exclude = ['userUid']
// 设置多对多关系（配置外键,设置别名）
// const { Book } = require('./book')
// const { User } = require('./user')
// Card.belongsTo(Book);
// Card.belongsTo(User);
module.exports = {
  Card
}
