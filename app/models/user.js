module.exports = (sequelize, dataType) => sequelize.define('user', {
    username: {
        type: dataType.STRING,
    },
    email: {
        type: dataType.STRING,
        validate: {
            isEmail: {
                msg: '邮箱格式不正确!'
            }
        }
    },
    password: {
        type: dataType.STRING,
        validate: {
            notEmpty: true,
        }
    },
})

