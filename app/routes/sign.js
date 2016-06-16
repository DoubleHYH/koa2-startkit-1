const router = require('koa-router')()
const { sign } = require('controllers')

router // 登陆
    .get('/in', sign.in.show)
    .post('/in', sign.in.auth)

router // 注册
    .get('/up', sign.up.show)
    .post('/up', sign.up.create)

router // 登出
    .get('/out', sign.out)

module.exports = router

