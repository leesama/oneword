module.exports = () => async (ctx, next) => {
  if (
    ctx.path.startsWith('/yiyan/fonts') ||
    ctx.path.startsWith('/yiyan/imgs') ||
    ctx.path.startsWith('/yiyan/music')
  ) {
    ctx.path = ctx.path.substr(6)
  }
  await next()
}
