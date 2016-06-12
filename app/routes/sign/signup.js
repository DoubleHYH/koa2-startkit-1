// 注册页
const router = require('koa-router')()

const $ = require('controllers')

router
    .get('/', $.sign.signup.show)
    .post('/', $.sign.signup.create)

module.exports = router
