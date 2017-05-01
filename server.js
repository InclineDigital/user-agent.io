const express = require('express')
const next = require('next')
const expressWS = require('express-ws');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express();

    // set up the websocket handler
    expressWS(server);

    // this belongs in a db/redis/memcached/whatever
    // right now it limits us to a single server/process, leaks memory, and looses everything at each restart
    const sessions = {};

    server.ws('/host/:guid', function(ws, req) {

      // todo: validate guid here
      let guid = req.params.guid;
      console.log('host connected', guid);
      sessions[guid] = ws;

      ws.on('message', function(msg) {
        console.log('ws message from host', msg);
      });

      ws.on('disconnect', function() {
        console.log('disconnect', guid);
        if (guid) {
          delete sessions[guid];
        }
      });
    });

    server.get('/share-with/:guid', (req, res) => {
      const guid = req.params.guid;
      const ua = req.headers['user-agent'];
      const host = sessions[guid];
      if (host && host.readyState === WebSocket.OPEN) {
        console.log('sharing with ', guid, ua)
        // todo: include ip and rev dns
        host.send(JSON.stringify({ua}));
      } else {
        console.log('no session for shared guid', guid, sessions)
      }
      const actualPage = '/';
      const queryParams = { guid, sharing: true };
      app.render(req, res, actualPage, queryParams)
    });

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
