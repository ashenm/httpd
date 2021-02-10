/**
 * httpd
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const root = require('./controllers/root');
const seize = require('./controllers/seize');

require('express')()
  .set('trust proxy', true)
  .use('/seize', seize)
  .use('/', root)
  .listen(process.env.PORT || 8080);

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
