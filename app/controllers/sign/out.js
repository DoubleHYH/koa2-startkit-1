const { createHash } = require('crypto')
const { User } = require('db/models')

module.exports = (ctx) => {
    ctx.session.user = null
    ctx.session.flash = {
        alert: {
            type: 'info',
            msg: '登出成功!'
        }
    }
    ctx.redirect('/')
}

