#! /usr/bin/env node

var subcommand = require('subcommand')

var match = subcommand({
  commands: [
    require('./commands/add'),
    require('./commands/login'),
    require('./commands/register')
  ]
})

match(process.argv.slice(2))
