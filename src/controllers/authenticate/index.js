/**
 * httpd
 * Authentication Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const https = require('https');
const querystring = require('querystring');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const stringify = require('json-stringify-safe');

const dispatch = require('../../utilities/status');
const authentication = require('../../utilities/authentication');
const logger = require('../../utilities/logger')('authenticate');

const decline = function reciprocateGatewayFailure (_error) {
  return this.response.status(502).json(dispatch.failure(502));
};

const regulate = function reciprocateGatewayResponse (stream) {
  this.response.status(stream.statusCode);
  return stream.pipe(this.response), this;
};

router.use(express.json());

router.get('/', authentication.checkJwt, function (_request, response) {
  response.status(200).json(dispatch.success(200));
});

router.post('/', function (request, response) {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const options = {
    method: 'POST',
    headers: headers
  };

  const upstream = https.request('https://ashenm.us.auth0.com/oauth/token', options)
    .on('response', regulate.bind({ response: response }))
    .on('error', decline.bind({ response: response }));

  upstream.write(querystring.stringify(request.body));
  upstream.end();

});

router.use(function (_request, response, next) {
  response.status(400).json(dispatch.failure(400));
});

router.use(function (error, _request, response, _next) {

  if (error instanceof jwt.UnauthorizedError) {
    response.status(error.status).json(dispatch.failure(error.status, error.inner.message));
    return;
  }

  logger.error({
    message: "Failed to execute OAuth handshake",
    event: { raw: stringify(error) },
  });

  response.status(500).json(dispatch.failure(500));

});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
