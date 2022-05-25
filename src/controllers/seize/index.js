/**
 * httpd
 * Seize Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const path = require('path');
const router = require('express').Router();

const dispatch = require('../../utilities/status');

const requesters = {
  'http:': require('http'),
  'https:': require('https')
};

const decline = function reciprocateGatewayFailure (error) {
  return this.response.status(502).json(dispatch.failure(502));
};

const regulate = function reciprocateGatewayResponse (stream) {
  this.response.status(stream.statusCode).set('Content-Disposition', `attachment; filename=${this.filename}`);
  return stream.pipe(this.response), this;
};

router.get('/', function (request, response) {

  let remote;

  if (!request.query.url) {
    response.status(400).json(dispatch.failure(400));
    return;
  }

  try {
    remote = new URL(request.query.url);
  } catch (e) {
    remote = null;
  }

  if (!remote) {
    response.status(400).json(dispatch.failure(400));
    return;
  }

  if (!requesters[remote.protocol]) {
    response.status(501).json(dispatch.failure(501));
    return;
  }

  requesters[remote.protocol].get(remote.href)
    .on('response', regulate.bind({ response: response, filename: path.basename(remote.pathname) }))
    .on('error', decline.bind({ response: response }));

});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
