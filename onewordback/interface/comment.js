const Router = require('koa-router')
const { Comment } = require('../dbs/models/comment')
const router = new Router({ prefix: '/yiyan' })
// 取前10条数据
router.post('/getcommentbycard', async (ctx, next) => {
  const { datetime, cardid } = ctx.request.body
  const cardInfo = datetime
    ? await Comment.findCommentsLteTime(datetime, cardid)
    : await Comment.findComments(cardid)
  return ctx.successBody('获取评论成功', cardInfo)
})

router.post('/newcomment', async (ctx, next) => {
  const { receiverid, content, cardid } = ctx.request.body
  const newComment = await Comment.newComment({
    user_uid: ctx.uid,
    receiver_uid: receiverid,
    content,
    card_textcardid: cardid
  })
  return ctx.successBody('评论成功', {
    commentid: newComment.commentid,
    datetime: newComment.toJSON().datetime
  })
})
router.post('/deletecomment', async (ctx, next) => {
  const { commentid } = ctx.request.body
  const deleteComment = await Comment.destroyComment({
    where: {
      user_uid: ctx.uid,
      commentid
    }
  })
  return ctx.successBody('删除成功')
})
router.post('/likecomment', async (ctx, next) => {
  const { commentid } = ctx.request.body

  const like = await Comment.increment('likecnt', {
    where: {
      commentid
    }
  })
  if (like) {
    return ctx.successBody('喜欢评论')
  } else {
    return ctx.failBody('喜欢评论失败')
  }
  // } else {
})
router.post('/cancellikecomment', async (ctx, next) => {
  const { commentid } = ctx.request.body
  const dislike = await Comment.decrement('likecnt', {
    where: {
      commentid
    }
  })
  if (dislike) {
    return ctx.successBody('取消喜欢评论')
  } else {
    return ctx.failBody('取消喜欢评论失败')
  }
})
module.exports = router
