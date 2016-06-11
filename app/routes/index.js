// 首页
const router = require('koa-router')()

router.get('/', ctx => {
    ctx.render('homepage', {
        content: '首页'
    })
})

module.exports = router
