'use strict'

const A_TRILLION = Math.pow(10, 12)

const http = require('http')
const fsp = require('fs-promise')

const responses = []
let badThings

fsp.readFile('bad-things.txt')
  .then(res => res.toString())
  .then(resStuff => resStuff.split('\n'))
  .then(derpBadThings => {
    badThings = derpBadThings

    const server = http.createServer((req, res) => {
      // res.setHeader('Content-Type', 'application/oclet-stream')
      responses.push({res, len: 0})
    })

    server.listen(5000)

    setTimeout(loop, 50)
  })
  .catch(e => console.error(e))

function loop() {
  for (let response of responses) {
    let { res, len } = response
    const blah = badThings[Math.floor(Math.random() * badThings.length)]
    len += blah.length
    response.len = len
    res.write(blah)
    if (len > A_TRILLION) {
      res.end()
      console.log('OH DEAR GOODNESS.')
      responses.splice(responses.indexOf(response), 1)
    }
    console.log(len)
  }
  setTimeout(loop, 1)
}
