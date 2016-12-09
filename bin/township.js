module.exports = require('township-client')({
  server: process.env.DOCPAGE_URL || 'http://127.0.0.1:3322',
  config: { filepath: '.hyperarchiverrc' }
})