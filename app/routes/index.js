// 首页
const router = require('koa-router')()

router.get('/', ctx => {
    ctx.render('homepage')
})

module.exports = router
