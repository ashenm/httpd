/**
 * httpd
 * GitHub Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const path = require('path');
const https = require('https');
const express = require('express');
const router = express.Router();

const dispatch = require('../../utilities/status');

const decline = function reciprocateGatewayFailure (_error) {
  return this.response.status(502).json(dispatch.failure(502));
};

const regulate = function reciprocateGatewayResponse (stream) {

  if (stream.statusCode !== 200) {
    return this.response.status(stream.statusCode).json(dispatch.failure(stream.statusCode)), this;
  }

  this.response.status(stream.statusCode).set('Content-Type', express.static.mime.lookup(this.filename));
  return stream.pipe(this.response), this;

};

router.use(function (request, response, _next) {

  let remote;

  try {
    remote = new URL(request.path, 'https://raw.githubusercontent.com/');
  } catch (e) {
    remote = null;
  }

  if (!remote) {
    response.status(400).json(dispatch.failure(400));
    return;
  }

  https.get(remote.href)
    .on('response', regulate.bind({ response: response, filename: path.basename(remote.pathname) }))
    .on('error', decline.bind({ response: response }));

});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
