// 控制器
const fs = require('fs')
const path = require('path')

const requireDir = require('uinz-require-dir') // 自己写的模块 require 一个目录

const controllers = requireDir(__dirname)

module.exports = controllers
