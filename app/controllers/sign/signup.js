const { createHash } = require('crypto')
const { user } = require('models')

exports.show = (ctx) => {
    ctx.render('sign/signup')
}

exports.create = async(ctx, next) => {
    const { username, email, password } = ctx.request.body
    const existed = await user.findOne({ where: { username } })
    if (existed) return ctx.body = 'existed'

    const _user = await user.create({
        username,
        email,
        password: createHash('md5').update(password).digest('hex')
    }).catch(e => e)

    ctx.body = _user
}

