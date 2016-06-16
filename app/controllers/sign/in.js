const { createHash } = require('crypto')
const { User } = require('db/models')

exports.show = ctx => {
  if (ctx.session.user) {
    ctx.flash.alert = {
      type: 'info',
      msg: '已经登录过了!'
    }
    return ctx.redirect('/')
  }
  ctx.render('sign/signin')
}

exports.auth = async(ctx) => {
  const { username } = ctx.request.body
  let { password } = ctx.request.body

  if (!username || !password) {
    ctx.session.flash = {
      alert: { type: 'info', msg: '请完善信息!' },
      content: { username }
    }
    return ctx.redirect('back')
  }

  const user = await User.findOne({ where: { username } }).catch(e => null)

  if (user) {
    password = createHash('md5').update(password).digest('hex')

    if (password === user.password) {
      ctx.session.user = user
      ctx.session.flash = {
        alert: { type: 'info', msg: '登录成功!' }
      }
      ctx.redirect('/')
    } else {
      ctx.session.flash = {
        alert: { type: 'danger', msg: '密码错误!' },
        content: { username }
      }
      ctx.session.user = null
      ctx.redirect('back')
    }
  } else {
    ctx.session.flash = {
      alert: { type: 'info', msg: '用户不存在!' },
      content: { username }
    }
    ctx.session.user = null
    return ctx.redirect('back')
  }
}

