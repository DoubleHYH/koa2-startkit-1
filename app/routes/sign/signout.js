const router = require('koa-router')()

router
    .get('/', ctx => {
        ctx.session.user = null
        ctx.session.flash = {
            alert: {
                type: 'info',
                msg: '登出成功!'
            }
        }
        ctx.redirect('/')
    })

module.exports = router
