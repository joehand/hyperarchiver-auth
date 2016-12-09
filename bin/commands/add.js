var path = require('path')

module.exports = {
  name: 'add',
  command: function add (args) {
    var ship = require('../township')

    ship.secureRequest({
      url: '/add',
      method: 'POST',
      json: true,
      body: {
        key: args.key
      }
    }, function (err) {
      if (err) return console.error(err)
      console.log('added success')
      process.exit()
    })
  },
  options: [
    // {
    //   name: '',
    //   abbr: '',
    //   boolean: false,
    //   default: '',
    //   help: ''
    // }
  ]
}