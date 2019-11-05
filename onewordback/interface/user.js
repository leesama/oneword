const Router = require('koa-router')
const upload = require('./utils/multer')
const { User } = require('../dbs/models/user')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')
const isEmail = require('validator/lib/isEmail')
const router = new Router({ prefix: '/yiyan' })
const { Book } = require('../dbs/models/book')

router.post('/signup', async ctx => {
  const { email, username, password } = ctx.request.body
  if (email.length === 0) {
    return ctx.failBody('请输入邮箱')
  }
  if (username.length === 0) {
    return ctx.failBody('请输入用户名')
  }
  if (password.length === 0) {
    return ctx.failBody('请输入密码')
  }
  if (username.length > 12) {
    return ctx.failBody('昵称长度过长')
  }
  if (!isEmail(email)) {
    return ctx.failBody('邮箱不正确')
  }
  const emailField = await User.findOne({
    where: {
      email
    }
  })
  if (emailField) {
    return ctx.failBody('邮箱已被注册')
  }
  const usernameField = await User.findOne({
    where: {
      username
    }
  })
  if (usernameField) {
    return ctx.failBody('昵称已被注册')
  }
  const nuser = await User.createUserAndInitData(username, password, email)
  if (nuser) {
    return ctx.successBody('注册成功')
  } else {
    return ctx.failBody('注册失败')
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, email, info, status) {
    if (err) {
      return ctx.failBody(err)
    } else {
      if (email) {
        ctx.successBody('登录成功', email)
        // logIn()操作，会调用一个_serializeUser(), 然后把序列化的结果存到req.session['passport']
        return ctx.login(email)
      } else {
        return ctx.failBody(info)
      }
    }
  })(ctx, next)
})

router.get('/exit', async ctx => {
  // logOut()操作直接删除session里passport里的user字段。
  await ctx.logout()
  // isAuthenticated()函数，用于检查当前是否已经鉴权成功
  if (!ctx.isAuthenticated()) {
    return ctx.successBody('退出成功')
  } else {
    return ctx.failBody('退出失败')
  }
})

router.get('/getuserinfoandbooklist', async ctx => {
  const userInfo = await User.getUserInfoAndBookList(ctx.uid)
  ctx.body = userInfo
})
// upload.single('pic') 会解析ctx.request.body里面的pic参数，将其转换为文件，存在设置好的路径里，可以通过 ctx.request.file.path获取路径
router.post('/updateuserinfo', upload.single('pic'), async ctx => {
  const uid = ctx.uid
  // 如果昵称需要修改，先查询user要修改的username是否已存在
  if (ctx.request.body.username) {
    const username = ctx.request.body.username
    if (username.length > 12) {
      return ctx.failBody('昵称长度过长')
    }
    // 查询user要修改的username是否已存在
    const userNameFinder = await User.findOne({ where: { username } })
    if (userNameFinder) {
      return ctx.failBody('该昵称已被人注册')
    } else {
      // 如果有图片,执行有图片的更新方法
      if (ctx.request.file) {
        let updateObj = { smallavatar: ctx.request.file.path, username }
        if (ctx.request.body.intro) {
          updateObj.intro = ctx.request.body.intro
        }
        const update = await User.updateHasImg(uid, updateObj)
        if (update) {
          return ctx.successBody('修改成功')
        } else {
          return ctx.failBody('修改失败,请重试')
        }
      } else {
        let updateObj = { username }
        if (ctx.request.body.intro) {
          updateObj.intro = ctx.request.body.intro
        }
        const update = await User.updateNoImg(uid, updateObj)
        if (update) {
          return ctx.successBody('修改成功')
        } else {
          return ctx.failBody('修改失败,请重试')
        }
      }
    }
  }
  // 如果昵称不需要修改,直接更新数据
  else {
    // 如果有图片,执行有图片的更新方法
    if (ctx.request.file) {
      let updateObj = { smallavatar: ctx.request.file.path }
      if (ctx.request.body.intro) {
        updateObj.intro = ctx.request.body.intro
      }
      const update = await User.updateHasImg(uid, updateObj)
      if (update) {
        return ctx.successBody('修改成功')
      } else {
        return ctx.failBody('修改失败,请重试')
      }
    } else {
      let updateObj = {}
      if (ctx.request.body.intro) {
        updateObj.intro = ctx.request.body.intro
      }
      const update = await User.updateNoImg(uid, updateObj)
      if (update) {
        return ctx.successBody('修改成功')
      } else {
        return ctx.failBody('修改失败,请重试')
      }
    }
  }
})
// 关联表的自动生成的字段名字要用驼峰  userUid 对应表中user_uid
router.post('/newbook', upload.single('pic'), async ctx => {
  const uid = ctx.uid
  const queryObj = {}
  const defaultObj = {}
  const { bookname } = ctx.request.body
  queryObj.bookname = bookname
  queryObj.userUid = uid
  if (ctx.request.file) {
    defaultObj.picpath = ctx.request.file.path
  }
  defaultObj.bookname = bookname
  defaultObj.userUid = uid
  // 如果这条数据不存在按照defaults设置数据
  const book = await Book.findOrCreate({
    where: queryObj,
    defaults: defaultObj
  })
  // book[1] true false 表示数据是否新增成功
  if (book[1]) {
    //   把数据返回回去
    // 图片路径字符串需要拼接之后再返回
    return ctx.successBody('新建成功', book[0])
  } else {
    return ctx.failBody('已存在相同文集')
  }
})

module.exports = router
