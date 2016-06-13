const { createHash } = require('crypto')
const { user } = require('models')

exports.show = (ctx) => {
    ctx.render('sign/signup')
}

exports.create = async(ctx, next) => {
    const { username, email, password } = ctx.request.body

    if (!username || !email || !password) {
        ctx.session.flash = {
            alert: { type: 'info', msg: '请完善信息' },
            content: { username, email }
        }
        return ctx.redirect('back')
    }

    const existed = await user.findOne({ where: { username } })
    if (existed) {
        ctx.session.flash = {
            alert: { type: 'info', msg: '该用户名已经存在!' },
            content: { username, email }
        }
        return ctx.redirect('back')
    }

    const _password = createHash('md5').update(password).digest('hex')

    const _user = await user.create({ username, email, password: _password }).catch(e => null)

    if (_user) {
        ctx.session.flash = {
            alert: { type: 'info', msg: '注册成功' }
        }
        ctx.session.user = _user
        ctx.redirect('/')
    } else {
        ctx.session.flash = {
            alert: { type: 'warning', msg: '注册失败!' },
            content: { username, email }
        }
        ctx.redirect('back')
    }
}
