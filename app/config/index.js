module.exports = process.env !== 'production'
    ? require('./development')
    : require('./production')