const {
  sequelize
} = require('../db')

const {
  Sequelize,
  Model
} = require('sequelize')

// define
class Book extends Model {

}

Book.init({
  bookid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookname: {
    type: Sequelize.STRING
  },
  cardcnt: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  picpath: { type: Sequelize.STRING }
}, {
  sequelize,
  tableName: 'book',
  modelName: 'book'
})
Book.prototype.exclude = ['userUid']

module.exports = {
  Book
}
