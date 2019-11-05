const { Book } = require('./book')
const { User } = require('./user')
const { Card } = require('./card')
const { Comment } = require('./comment')
User.hasMany(Book)
User.hasMany(Card)
Book.hasMany(Card)
// card表关联两次，使用as代替目标模型名称，指定外键，不指定会以originbook_bookid创建，关联n次会创建n次，这里我们指定
Card.belongsTo(Book, {
  as: 'originbook',
  foreignKey: 'book_bookid'
})
Card.belongsTo(User, { as: 'creator', foreignKey: 'user_uid' })
// 评论表关联两个表，其中user表关联两次
Comment.belongsTo(Card, { as: 'textcard', foreignKey: 'card_textcardid' })
Comment.belongsTo(User, { as: 'creator', foreignKey: 'user_uid' })
Comment.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_uid' })
