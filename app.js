require('app-module-path').addPath(__dirname + '/app')

const _ = require('lodash')
const path = require('path')
const Koa = require('koa')
const Pug = require('koa-pug')
const mount = require('mount-koa-routes')
const bodyParser = require('koa-bodyparser')
// const convert = require('koa-convert')
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

const isDev = !(process.env === 'production')

const app = new Koa
const PORT = process.env.PORT || 8080

isDev && onerror(app)

app.keys = ['uinz']
app.use(bodyParser())
app.use(session({store: pgStore}))
app.use(flash({ key: 'flash' }))
app.use(server(path.join(__dirname, 'public')))

new Pug({
    app,
    debug: isDev,
    viewPath: path.join(__dirname, 'app/views'),
    basedir: path.join(__dirname, 'app/views/extends'),
})

app.use(async (ctx, next) => {
    ctx.state.content = {}
    try {
        delete ctx.session.user.password
        ctx.state.user = ctx.session.user
        ctx.state.alert = ctx.flash.alert || null
        ctx.state.content = ctx.flash.content || {}
    } catch(e) {}

    await next()

})

mount(app, path.join(__dirname, 'app/routes'), true)

pgStore.setup().then(() => {
    app.listen(PORT, () => console.log(`listen on port ${PORT}`))
})
