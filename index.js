/**
 * httpd
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const github = require('./controllers/github');
const root = require('./controllers/root');
const seize = require('./controllers/seize');
const stash = require('./controllers/stash');
const authenticate = require('./controllers/authenticate');

require('express')()
  .set('trust proxy', true)
  .set('view engine', 'pug')
  .set('views', './views')
  .use('/seize', seize)
  .use('/github', github)
  .use('/authenticate', authenticate)
  .use('/stash', stash)
  .use('/', root)
  .listen(process.env.PORT || 8080);

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
