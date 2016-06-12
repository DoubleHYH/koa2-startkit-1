const { createHash } = require('crypto')
const { user } = require('models')

exports.show = ctx => {
    if (ctx.session.user) {
        return ctx.redirect('/')
    }
    ctx.render('sign/signin')
}

exports.auth = async ctx => {
    const { username, password } = ctx.request.body
    const _user = await user.findOne({ where: { username } }).catch(e => null)
    if (_user) {
        if (createHash('md5').update(password).digest('hex') === _user.password) {
            ctx.session.user = _user
            ctx.session.flash = {
                type: 'success',
                msg: '登陆成功!'
            }
            ctx.redirect('/')
        } else {
            ctx.session.user = null
            ctx.redirect('/')
        }
    } else {
        ctx.session.user = null
        return ctx.redirect('back')
    }
}

