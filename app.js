require('app-module-path').addPath(__dirname + '/app')

const _ = require('lodash')
const Koa = require('koa')
const Pug = require('koa-pug')
const mount = require('mount-koa-routes')
const bodyParser = require('koa-bodyparser')
const server = require('koa-static')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const flash = require('koa-flash')
const onerror = require('koa-onerror')

const isDev = !(process.env === 'production')

const app = new Koa
const PORT = process.env.PORT || 8080

isDev && onerror(app)

app.keys = ['uinz']
app.use(bodyParser())

// app.use(session({store: pgStore}))
// app.use(session2({ store: { host: '127.0.0.1', port: 6379, ttl: 3600 } }))
app.use(session({ store: redisStore() }))

app.use(flash({ key: 'flash' }))
app.use(server(`${__dirname}/public`))

new Pug({
    app,
    debug: isDev,
    viewPath: `${__dirname}/app/views`,
    basedir: `${__dirname}/app/views/extends`,
})

app.use(async(ctx, next) => {
    ctx.state.user = ctx.session.user
    ctx.state.alert = ctx.flash.alert || null
    ctx.state.content = ctx.flash.content || {}
    await next()
})

mount(app, `${__dirname}/app/routes`, true)

app.listen(PORT, () => console.log(`listen on port ${PORT}`))

