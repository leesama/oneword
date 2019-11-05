const { sequelize } = require('../db')
const { Card } = require('./card.js')
const { Sequelize, Model, Op } = require('sequelize')
const moment = require('moment')

// define
class Comment extends Model {
  static async newComment(createObj) {
    return sequelize.transaction(async t => {
      const newcomment = await Comment.create(createObj, {
        transaction: t
      })
      await Card.increment(['replycnt', 'commentcnt'], {
        where: { textcardid: createObj.card_textcardid },
        transaction: t
      })
      return newcomment
    })
  }
  static async destroyComment(destroyObj) {
    return sequelize.transaction(async t => {
      const comment = await Comment.findOne(destroyObj, {
        transaction: t
      })
      await comment.destroy({
        transaction: t
      })
      await Card.decrement(['replycnt', 'commentcnt'], {
        where: { textcardid: comment.card_textcardid },
        transaction: t
      })
    })
  }
  static async findCommentsLteTime(time, cardId) {
    const comments = await Comment.findAll({
      where: {
        datetime: {
          [Op.lte]: moment(time).format()
        },
        card_textcardid: cardId
      },
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['card_textcardid', 'user_uid'] },
      include: ['textcard', 'creator', 'receiver']
    })
    return comments
  }
  static async findComments(cardId) {
    const comment = await Comment.findAll({
      limit: 10,
      order: [['datetime', 'DESC']],
      attributes: { exclude: ['card_textcardid', 'user_uid'] },
      include: ['textcard', 'creator', 'receiver'],
      where: {
        card_textcardid: cardId
      }
    })
    return comment
  }
}

Comment.init(
  {
    commentid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING
    },
    receiverid: {
      type: Sequelize.INTEGER
    },
    likecnt: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'comment',
    modelName: 'comment'
  }
)

module.exports = {
  Comment
}
