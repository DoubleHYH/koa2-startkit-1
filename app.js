const Koa = require('koa')
const path = require('path')
const Pug = require('koa-pug')
const mount = require('mount-koa-routes')

const app = new Koa

app.use(async(ctx, next) => {
    const date = Date.now()
    await next()
    console.log(Date.now() - date)
})

// 模板引擎
new Pug({
    app,
    debug: process.env.NODE_ENV === 'development',
    pretty: process.env.NODE_ENV === 'development',
    viewPath: path.join(__dirname, 'app/views'),
    basedir: path.join(__dirname, 'app/views/extends'),
})

// 路由
mount(app, path.join(__dirname, 'app/routes'), true)

module.exports = app
