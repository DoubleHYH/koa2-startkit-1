// 首页
const $ = require('controllers')
const router = require('koa-router')()

router.get('/', $.homepage.show)

module.exports = router
