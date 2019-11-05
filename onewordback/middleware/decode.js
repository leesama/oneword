/**
 * @description: 解码
 * @param {type} 
 * @return: 
 */

module.exports = () => async (ctx, next) => {
  for (let param in ctx.request.body) {
    ctx.request.body[param] = decodeURIComponent(ctx.request.body[param]);
  }

  await next();
}