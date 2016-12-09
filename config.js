var path = require('path')
var xtend = require('xtend')

var config = {
  shared: {
    host: 'http://127.0.0.1',
    port: 3322,
    secret: 'this is not very secret',
    archivesDir: path.join(__dirname, 'archives'),
    dbDir: path.join(__dirname, 'db'),
    email: {
      fromEmail: 'hi@example.com',
      postmarkAPIKey: 'your api key'
    }
  },
  development: {},
  staging: {},
  production: {}
}

var env = process.env.NODE_ENV || 'development'
module.exports = xtend(config.shared, config[env])