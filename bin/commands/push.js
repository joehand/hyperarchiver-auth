module.exports = {
  name: 'push',
  command: function push (args) {
    var pump = require('pump')
    var network = require('peer-network')()
    var ship = require('../township')
    var Dat = require('dat-node')
    var token = ship.getLogin().token
    if (!token) {
      console.error('login first')
      process.exit(1)
    }

    Dat(process.cwd(), function (err, dat) {
      if (err || !dat.resumed) {
        if (err) console.error(err)
        else console.error('create a dat here first')
        console.log(dat)
        process.exit(1)
      }

      var stream = network.connect('hyperarchiver')
      stream.once('connect', function (err) {
        if (err) return cb(err)
        stream.write(token)
        pump(stream, dat.archive.replicate(), stream, function (err) {
          if (err) return cb(err)
        })
      })
      remoteProgress(dat.archive.content)

      stream.once('close', function (err) {
        if (err) console.error(err)
        else console.log('closed?')
        process.exit(1)
      })

      function remoteProgress (feed, interval) {
        if (!interval) interval = 200
        var remoteBlocks = 0

        var it = setInterval(function () {
          remoteBlocks = update()
          console.log(`${remoteBlocks} of ${feed.blocks} blocks sent`)
          if (remoteBlocks === feed.blocks) {
            stream.end()
            clearInterval(it)
            console.log('done')
            process.exit(0)
          }
        }, interval)

        function update () {
          var have = 0
          var peer = feed.peers[0]
          if (!peer) return 0
          for (var j = 0; j < feed.blocks; j++) {
            if (peer.remoteBitfield.get(j)) have++
          }
          return have
        }
      }

    })
  }
}
