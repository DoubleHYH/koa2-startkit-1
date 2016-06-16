// 自己写的模块 require 一个目录, 根据目录加载控制器
const requireDir = require('uinz-require-dir')
const controllers = requireDir(__dirname)

module.exports = controllers
