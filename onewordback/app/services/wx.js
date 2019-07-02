const util = require("util")
const axios = require("axios")

const { User } = require("../models/user")
const { generateToken } = require("../../core/util")
const { Auth } = require("../../middlewares/auth")

class WXManager {
  // 通过小程序的携带的code去查询openid，再生成token
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )
    // 通过小程序提供的api来获取openid
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errs.AuthFailed("openid获取失败")
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if (errcode) {
      throw new global.errs.AuthFailed("openid获取失败:" + errmsg)
    }
    // openid
    // 档案 user uid openid 长
    // openid
    // 通过openid找到用户，如果没有创建一个用户
    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    // 生成token
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}
