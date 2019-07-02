//
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app
    //初始化router
    // InitManager.initLoadRouters()
    //挂载HttpException到global
    InitManager.loadHttpException()
    //初始化配置
    // InitManager.loadConfig()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/`
    // 加载apiDirectory目录下的所有模块，并将获取到的每个模块路径作为参数传递到apiDirectory回调函数
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      // 如果是Router的实例，挂载到app
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
