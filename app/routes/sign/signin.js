// 注册页
const router = require('koa-router')()

const $ = require('controllers')

router
    .get('/', $.sign.signin.show)
    .post('/', $.sign.signin.auth)

module.exports = router
