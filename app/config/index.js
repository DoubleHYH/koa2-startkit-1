exports.db = {
    development: {
        username: null,
        password: null,
        database: 'koa',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    test: {
        username: 'postgres',
        password: 'postgres',
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    production: {
        username: 'postgres',
        password: 'postgres',
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'postgres'
    }
}
