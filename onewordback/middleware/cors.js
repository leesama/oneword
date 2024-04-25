/**
 * @description: cors
 * @param {type}
 * @return:
 */
module.exports = () => async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  ctx.set("Access-Control-Max-Age", "86400");

  if (ctx.method === "OPTIONS") {
    ctx.status = 204;
  } else {
    await next();
  }
};
