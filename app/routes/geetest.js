const router = require('koa-router')()
const Geetest = require('promise-geetest')
const { privateKey, publicKey } = require('config').geetest

const geetest = new Geetest(privateKey, publicKey)

// 极验接口
router.get('/register', async(ctx, next) => {
  // 向极验申请一次验证所需的challenge
  const data = await geetest.register().catch(e => null)
  console.log(data)
})

router.post('/validate', (ctx, next) => {
  const {
    geetest_challenge: challenge,
    geetest_validate: validate,
    geetest_seccode: seccode
  } = ctx.request.body

  // 对ajax提交的验证结果值进行验证
  geetest.validate({ challenge, validate, seccode }, (err, result) => {
    const data = { status: 'success', info: '登录成功' }
    if (err || !result) {
      data.status = 'fail'
      data.info = '登录失败'
    }
    ctx.body = JSON.stringify(data)
  })
})

router.post('/form-validate', (ctx, next) => {
  const {
    geetest_challenge: challenge,
    geetest_validate: validate,
    geetest_seccode: seccode
  } = ctx.request.body

  // 对form表单的结果进行验证
  geetest.validate({ challenge, validate, seccode }, (err, result) => {
    if (err || !result) {
      ctx.body = '<h1 style="text-align: center">登陆失败</h1>'
    } else {
      ctx.body = '<h1 style="text-align: center">登陆成功</h1>'
    }
  })
})

module.exports = router

