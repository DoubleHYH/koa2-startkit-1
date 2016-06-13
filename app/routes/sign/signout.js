const router = require('koa-router')()

router
    .get('/', ctx => {
        ctx.session.user = null
        ctx.flash.alert = {
            type: 'success',
            msg: '登出成功!'
        }
        ctx.redirect('/')
    })

module.exports = router
