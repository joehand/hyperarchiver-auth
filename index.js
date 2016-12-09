var http = require('http')
var url = require('url')
var level = require('level-party')
var township = require('township')
var createApp = require('appa')
var hyperarchiver = require('hyperarchiver')

var send = require('appa/send')
var error = require('appa/error')
var config = require('./config')

var db = level(config.dbDir)
var ship = township(config, db)
var app = createApp()
var archiver = hyperarchiver({dir: config.archivesDir})

app.on('/add', function (req, res, ctx) {
  if (req.method === 'POST') {
    ship.verify(req, res, function (err, decoded, token) {
      if (err) return error(400, err.message).pipe(res)
      if (!decoded) return error(403, 'Not authorized').pipe(res)
      archiver.api.add(req, res, ctx, function (err, code, data) {
        if (err) return app.error(res, code, err.message)
        app.send(code, data).pipe(res)
      })
    })
  } else {
    send().pipe(res)
  }
})

app.on('/status', function (req, res, ctx) {
  archiver.api.status(req, res, ctx, function (err, code, data) {
    if (err) return app.error(res, code, err.message)
    app.send(code, data).pipe(res)
  })
})

app.on('/register', function (req, res, ctx) {
  ship.register(req, res, ctx, function (err, statusCode, obj) {
    if (err) return error(400, err.message).pipe(res)
    send(obj).pipe(res)
  })
})

app.on('/login', function (req, res, ctx) {
  ship.login(req, res, ctx, function (err, code, token) {
    if (err) return error(400, err.message).pipe(res)
    send(token).pipe(res)
  })
})

http.createServer(function (req, res) {
  if (req.url.indexOf('/archives') > -1) {
    req.url = url.parse(req.url).pathname.replace('/archives','')
    console.log(req.url)
    return archiver.dat.httpRequest(req, res)
  }
  return app(req, res)
}).listen(config.port, function () {
  console.log(`server started on http://127.0.0.1:${config.port}`)
})
