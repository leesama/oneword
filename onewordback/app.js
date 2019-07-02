// 引入别名组件
require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')

const path = require('path')
const InitManager = require('./core/init')
//  异常处理中间件
const catchError = require('./middlewares/exception')
const static = require('koa-static')

// require('./app/models/classic')
const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))

InitManager.initCore(app)

app.listen(3000)
