const Router = require('koa-router')
const { Card } = require('../dbs/models/card')
const router = new Router({ prefix: '/yiyan' })
const upload = require('./utils/multer')
router.post('/newcard', upload.single('picpath'), async (ctx, next) => {
  let queryParams = ctx.request.body
  if (ctx.request.file) {
    queryParams.picpath = ctx.request.file.path
  }
  queryParams.bookBookid = ctx.request.body.bookid
  queryParams.userUid = ctx.uid
  const userInfo = await Card.create(queryParams)
  if (userInfo) {
    return ctx.successBody('创建成功')
  } else {
    return ctx.failBody('创建失败,请重试')
  }
})
/**
 * @description: 如果参数中有datetime，取出datetime之后的n条数据，如果没有，取出n条数据
 * @param {type}
 * @return:
 */
router.post('/getfeeds', async (ctx, next) => {
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTime(datetime)
    : await Card.findCards()
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

// 喜欢的数量等于评论数-回复数,没有喜欢这个字段，有评论数和回复数字段,这里把评论数增加也就是把喜欢数量增加了
router.post('/newlike', async (ctx, next) => {
  const { cardid } = ctx.request.body
  const increment = await Card.increment('commentcnt', {
    where: { textcardid: cardid }
  })
  if (increment) {
    return ctx.successBody('已同感')
  } else {
    return ctx.failBody('同感失败,请重试')
  }
})
router.post('/cancellike', async (ctx, next) => {
  const { cardid } = ctx.request.body
  const increment = await Card.decrement('commentcnt', {
    where: { textcardid: cardid }
  })
  if (increment) {
    return ctx.successBody('取消同感')
  } else {
    return ctx.failBody('取消同感失败,请重试')
  }
})
router.post('/getalltextcard', async (ctx, next) => {
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findTextCardsLteTime(datetime)
    : await Card.findTextCards()
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})
// 热门获取原创的数据
router.post('/gethottextcard', async (ctx, next) => {
  const query = { category: '0' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

router.post('/getwordtextcard', async (ctx, next) => {
  const query = { category: '0' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

router.post('/getorigintextcard', async (ctx, next) => {
  const query = { original: '1' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

router.post('/getquotationtextcard', async (ctx, next) => {
  const query = { category: '1' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})
router.post('/getlyrictextcard', async (ctx, next) => {
  const query = { category: '2' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})
router.post('/getmovietextcard', async (ctx, next) => {
  const query = { category: '3' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

router.post('/getpoemtextcard', async (ctx, next) => {
  const query = { category: '4' }
  const { datetime } = ctx.request.body
  const cardInfo = datetime
    ? await Card.findCardsLteTimeByQuery(query, datetime)
    : await Card.findCardsByQuery(query)
  return ctx.successBody('获取成功', { textcardlist: cardInfo })
})

module.exports = router
