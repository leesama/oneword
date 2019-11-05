/**
 * @description: 异常捕获
 * @param {type} 
 * @return: 
 */
module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}
