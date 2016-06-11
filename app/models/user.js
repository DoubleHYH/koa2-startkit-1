module.exports = (sequelize, dataType) =>
    sequelize.define('user', {
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
                len: {
                    args: [4, 12],
                    msg: '密码长度必须必须大于等于 4 小于等于 12!'
                }
            }
        },
    })
