const basicAuth = require("basic-auth")
const jwt = require("jsonwebtoken")

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      // basicAuth库 解析token
      const userToken = basicAuth(ctx.req)
      let errMsg = "token不合法"

      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        // jwt.verify验证token
        var decode = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        )
      } catch (error) {
        if (error.name == "TokenExpiredError") {
          errMsg = "token已过期"
        }
        throw new global.errs.Forbbiden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = "权限不足"
        throw new global.errs.Forbbiden(errMsg)
      }

      // uid,scope
      // 从token中获取uid
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }

  // 验证token是否有效
  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}
