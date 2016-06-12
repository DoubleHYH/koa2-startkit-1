const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('koa', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
})

const models = {}

fs.readdirSync(__dirname).filter(file => file.indexOf('.') > 0 && file !== 'index.js').forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    models[model.name] = model
})

Object.keys(models).forEach(name => {
    if (models[name].options.hasOwnProperty('associate')) {
        models[name].options.associate(models)
    }
})

module.exports = models

