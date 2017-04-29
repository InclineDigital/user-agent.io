const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // request expects named params to not contain a slash
    // so, just capture it all with * and then substr out the /ua/ part
    server.get('/ua/*', (req, res) => {
      const actualPage = '/'
      const queryParams = { ua: decodeURIComponent(req.url.substr(4)) }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
