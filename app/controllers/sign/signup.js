const { createHash } = require('crypto')
const { user } = require('models')

exports.show = (ctx) => {
    console.log(1)
    ctx.render('sign/signup')
}

exports.create = async(ctx, next) => {
    const { username, email, password } = ctx.request.body
    
    if (!username || !email || !password) {
        ctx.flash = {
            type: 'info',
            msg: '请完善信息'
        }
        return ctx.redirect('back')
    }

    const existed = await user.findOne({ where: { username } })
    if (existed) {
        ctx.flash = {
            type: 'info',
            msg: '该用户名已经存在!'
        }
        return ctx.redirect('back')
    }

    const _user = await user.create({
        username,
        email,
        password: createHash('md5').update(password).digest('hex')
    }).catch(e => null)

    if (_user) {
        ctx.flash = {
            type: 'success',
            msg: '注册成功'
        }
        ctx.session.user = _user
        ctx.redirect('/')
    } else {
        ctx.flash = {
            type: 'warning',
            msg: '注册失败!'
        }
        ctx.redirect('back')
    }
}

