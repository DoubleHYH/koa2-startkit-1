# koa@2 startkit

| package | - |
|:-:|:-:|
| [koa-pug](https://github.com/chrisyip/koa-pug) | 也就是 jade 模板引擎 |
| [Sequelize](http://docs.sequelizejs.com/en/latest/)/[Sequelize-cli](https://github.com/sequelize/cli) | ORM 操作数据库 支持 PostgreSQL, MySQL, SQLite and MSSQL |
| [Redis](http://redis.io/) | 储存 session |
| [mount-koa-routes](https://github.com/moajs/mount-koa-routes) | 根据目录自动加载 routes |
| [uinz-require-dir](https://github.com/uinz/uinz-require-dir) | 根据目录自动加载 controllers |
| stylus | css 预编译|
| browser-sync | 解放 `CMD + R` 监听 js 的时候 reload 有问题, 之前写另一个 gulp.task `js:watch` 去监听 js 可以的, 这里需要再做调整, 目前也没监听后端 js|

## 目录结构
```
koa@2-startkit
 |- app
 |  |- config 配置
 |  |
 |  |- controllers 控制器 C
 |  |
 |  |- db 数据库  M
 |  |   |- migrations
 |  |   |
 |  |   |- models
 |  |   |
 |  |   `- seeders
 |  |
 |  |- routes 路由
 |  |
 |  `- views 模板 V
 |
 |- public 静态资源
 |  |
 |  |- javescript
 |  |
 |  `- stylesheets
 |
 `- static_src 静态资源 源文件
    |
    |- es6
    |
    `- stylus
```