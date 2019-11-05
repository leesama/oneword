/**
 * @description: 用于设定通用的状态码和信息函数
 * @param {type} 
 * @return: 
 */
module.exports = () => async (ctx, next) => {

  ctx.successBody = function (msg = '成功') {
    if (arguments.length == 2) {
      ctx.body = {
        code: 0,
        msg,
        data: arguments[1]
      }
    } else {
      ctx.body = {
        code: 0,
        msg
      }
    }
  }
  ctx.failBody = function (msg = '失败') {
    ctx.body = {
      code: -1,
      msg
    }

  }
  await next();

};