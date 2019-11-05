const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const { User } = require('../../dbs/models/user')

// 使用passport本地策略
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function (email, password, done) {
  let result = await User.findOne({
    where: {
      email
    }
  })
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '邮箱账号不存在')
  }
}))

passport.serializeUser(function (email, done) {
  done(null, email)
})

passport.deserializeUser(function (email, done) {
  return done(null, email)
})

module.exports = passport 
