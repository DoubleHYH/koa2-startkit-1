// 注册页

const $ = require('../controllers')
const router = require('koa-router')()

router
    .get('/', ctx => {
        ctx.render('signin', {
            content: ''
        })
    })
    .post('/', $.user.create)

module.exports = router
