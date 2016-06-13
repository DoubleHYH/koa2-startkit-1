require('app-module-path').addPath(__dirname + '/app')

const _ = require('lodash')
const path = require('path')
const Koa = require('koa')
const Pug = require('koa-pug')
const mount = require('mount-koa-routes')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const server = require('koa-static')
const session = require('koa-generic-session')
const PgStore = require('koa-pg-session')
const flash = require('koa-flash')
const onerror = require('koa-onerror')

const pgStore = new PgStore({
    host: 'localhost',
    database: 'koa',
    port: 5432,
})

const app = new Koa
const PORT = process.env.PORT || 8080

app.keys = ['uinz']

onerror(app)

app.use(bodyParser())
app.use(session({store: pgStore}))
app.use(flash({ key: 'flash' }))
app.use(convert(server(path.join(__dirname, 'public'))))

new Pug({
    app,
    debug: process.env.NODE_ENV !== 'production',
    viewPath: path.join(__dirname, 'app/views'),
    basedir: path.join(__dirname, 'app/views/extends'),
})

app.use(async (ctx, next) => {
    ctx.state.user = ctx.session.user
    ctx.state.alert = ctx.flash.alert
    ctx.state.content = ctx.flash.content || {}
    await next()
})

mount(app, path.join(__dirname, 'app/routes'), true)

pgStore.setup().then(() => {
    app.listen(PORT, () => console.log(`listen on port ${PORT}`))
})
