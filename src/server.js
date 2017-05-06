const DNS = require('dns');

const express = require('express');
const next = require('next');
const expressWS = require('express-ws');
const WebSocket = require('ws');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // required to read client ip properly behind bluemix's reverse proxy
    server.set('trust proxy', true);

    // setup auth
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(
      session({
        name: 'session',
        keys: ['todo: pull this from env'],
        maxAge: 365 * 24 * 60 * 60 * 1000
      })
    );
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser(function(user, done) {
      done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function(userStr, done) {
      done(null, JSON.parse(userStr));
    });

    passport.use(
      new LocalStrategy(function(username, password, done) {
        console.log('checking ', username, password);
        if (username === 'nathan@nfriedly.com' && password === 'foobar') {
          return done(null, { email: username });
        } else {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      })
    );

    server.post(
      '/login',
      passport.authenticate('local', {
        successRedirect: '/host',
        failureRedirect: '/login'
      })
    );

    // set up the websocket handler
    expressWS(server);

    // todo: this belongs in a db/redis/memcached/whatever
    // right now it limits us to a single server/process, leaks memory, and looses everything at each restart
    const sessions = {};

    server.ws('/host/:guid', function(ws, req) {
      // todo: validate guid here
      const guid = req.params.guid;
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
      const ua = req.headers['user-agent'] || '(No User-Agent header was included on this request)';
      const isAdsense = ua.includes('Mediapartners-Google');
      if (isAdsense) {
        console.log('skipping adsense bot on host page', ua);
      } else {
        const host = sessions[guid];
        if (host && host.readyState === WebSocket.OPEN) {
          console.log('sharing with ', guid, ua);
          const ip = req.ip;
          DNS.reverse(ip, (err, hostNames) => {
            if (err) {
              console.error(`Error retrieving reverse DNS for ${ip}: `, err);
            }
            const revDns = (hostNames && hostNames.length && hostNames[0]) || null;
            host.send(JSON.stringify({ ua, ip, revDns }));
          });
        } else {
          console.log('no session for shared guid', guid, sessions);
        }
      }
      res.redirect('/?shared=true');
    });

    // request expects named params to not contain a slash
    // so, just capture it all with * and then substr out the /ua/ part
    server.get('/ua/*', (req, res) => {
      const actualPage = '/';
      const queryParams = { ua: decodeURIComponent(req.url.substr(4)) };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
