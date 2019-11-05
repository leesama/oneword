const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const range = require('koa-range')
const static = require('koa-static')
const Redis = require('koa-redis')
const json = require('koa-json')
const passport = require('./interface/utils/passport')
const user = require('./interface/user')
const card = require('./interface/card')
const comment = require('./interface/comment')
const changePath = require('./middleware/changeStaicPath')
const error = require('./middleware/catchError')
const decode = require('./middleware/decode')
const isLogin = require('./middleware/isLogin')
const normalBody = require('./middleware/normalBody')
const redisConfig = require('./dbs/config').redis

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.keys = ['oneword', 'leecho']
app.proxy = true
// 自定义的错误处理中间件
// app.use(error())
// 自定义的修改静态文件路径的中间件
app.use(changePath())
//设置range requests
app.use(range)
app.use(static('./static'))
app.use(static('./uploads'))
// 关闭session httponly,因为前端会读取cookie
app.use(
  session(
    {
      key: 'oneword',
      maxAge: 604800000,
      prefix: 'oneword:uid',
      httpOnly: false,
      store: new Redis(redisConfig)
    },
    app
  )
)
app.use(bodyParser())
//  自定义的解码中间件
app.use(decode())
app.use(json())
// 自定义的设置通用body中间件
app.use(normalBody())
app.use(passport.initialize())
app.use(passport.session())
//  自定义的判断用户是否登录中间件
app.use(isLogin())
app.use(user.routes()).use(user.allowedMethods())
app.use(card.routes()).use(card.allowedMethods())
app.use(comment.routes()).use(comment.allowedMethods())
// 关联的配置拆分成一个单独的文件，否则会有循环导入的可能，造成model undefined
require('./dbs/models/associate')

app.listen(3000)
