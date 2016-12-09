#! /usr/bin/env node

var subcommand = require('subcommand')

var match = subcommand({
  commands: [
    require('./commands/add'),
    require('./commands/login'),
    require('./commands/register'),
    require('./commands/push')
    // {
    //   name: 'server',
    //   command: function add (args) {
    //     process.env.DEBUG = 'archiver-server, archiver-api, hyperarchiver'
    //     require('../index')
    //   }
    // }
  ]
})

match(process.argv.slice(2))
