const { createHash } = require('crypto')
const { User } = require('db/models')

class Signup {

    show = (ctx) => {
        ctx.render('sign/signup')
    }

    create = async(ctx, next) => {
        const { username, email } = ctx.request.body
        let { password } = ctx.request.body

        if (!username || !email || !password) {
            ctx.session.flash = {
                alert: { type: 'info', msg: '请完善信息' },
                content: { username, email }
            }
            return ctx.redirect('back')
        }

        const existed = await User.findOne({ where: { username } })

        if (existed) {
            ctx.session.flash = {
                alert: { type: 'info', msg: '该用户名已经存在!' },
                content: { username, email }
            }
            return ctx.redirect('back')
        }

        password = createHash('md5').update(password).digest('hex')

        const user = await User.create({ username, email, password }).catch(e => null)

        if (user) {
            ctx.session.flash = {
                alert: { type: 'info', msg: '注册成功' }
            }
            ctx.session.user = user
            ctx.redirect('/')
        } else {
            ctx.session.flash = {
                alert: { type: 'warning', msg: '注册失败!' },
                content: { username, email }
            }
            ctx.redirect('back')
        }
    }
}


module.exports = new Signup
