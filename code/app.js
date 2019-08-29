var express = require('express')
var ws = require('./server')

var app = express()

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(4788, function () {
  console.log('Example app listening on port 4788!')
})