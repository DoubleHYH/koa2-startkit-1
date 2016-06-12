const router = require('koa-router')()

router
    .get('/', ctx => {
        ctx.session.user = null
        ctx.redirect('/')
    })

module.exports = router
