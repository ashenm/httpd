/**
 * httpd
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const helmet = require('helmet');
const github = require('./controllers/github');
const root = require('./controllers/root');
const seize = require('./controllers/seize');
const stash = require('./controllers/stash');
const authenticate = require('./controllers/authenticate');
const devtools = require('./controllers/dev-tools');

require('express')()
  .use(helmet())
  .set('trust proxy', true)
  .set('view engine', 'pug')
  .set('views', './views')
  .use('/seize', seize)
  .use('/github', github)
  .use('/authenticate', authenticate)
  .use('/dev-tools', devtools)
  .use('/stash', stash)
  .use('/', root)
  .listen(process.env.PORT || 8080);

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
