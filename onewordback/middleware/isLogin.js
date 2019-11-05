/**
 * @description: 用于判定用户是否登录
 * @param {type}
 * @return:
 */
module.exports = () => async (ctx, next) => {
  const path = ctx.path
  // 不需要判定是否登录的请求
  const noNeedLoginPath = [
    '/yiyan/signin',
    '/yiyan/signup',
    '/imgs/',
    '/music/'
  ]
  let shouldCheckIsLogin = true

  for (const p of noNeedLoginPath) {
    if (path.startsWith(p)) {
      shouldCheckIsLogin = false
    }
  }
  const isLogin = ctx.isAuthenticated()
  // 如果要检测是否登录的路径检测到没有登录，抛出401
  if (shouldCheckIsLogin && !isLogin) {
    ctx.throw(401)
  }
  // 如果用户登录了，将uid挂载到ctx
  if (isLogin) {
    ctx.uid = ctx.session.passport.user.uid
  }
  await next()
}
