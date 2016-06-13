const { createHash } = require('crypto')
const { user } = require('models')

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

exports.auth = async ctx => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
        ctx.flash.alert = {
            type: 'info',
            msg: '请完善信息!'
        }
        return ctx.redirect('back')
    }

    const _user = await user.findOne({ where: { username } }).catch(e => null)
    if (_user) {
        const _password = createHash('md5').update(password).digest('hex')
        if ( _password === _user.password) {
            ctx.session.user = _user
            ctx.flash.alert = {
                type: 'success',
                msg: '登录成功!'
            }
            ctx.redirect('/')
        } else {
            ctx.flash.alert = {
                type: 'warning',
                msg: '密码错误!'
            }
            ctx.session.user = null
            ctx.redirect('back')
        }
    } else {
        ctx.flash.alert = {
            type: 'warning',
            msg: '用户不存在!'
        }
        ctx.session.user = null
        return ctx.redirect('back')
    }
}
