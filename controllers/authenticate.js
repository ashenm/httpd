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

const dispatch = require('../utilities/status');
const authentication = require('../utilities/authentication');

const decline = function reciprocateGatewayFailure (error) {
  return this.response.status(502).json(dispatch.failure(502));
};

const regulate = function reciprocateGatewayResponse (stream) {
  this.response.status(stream.statusCode);
  return stream.pipe(this.response), this;
};

router.use(express.json());

router.get('/', authentication.checkJwt, function (request, response) {
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

router.use(function (request, response, next) {
  response.status(400).json(dispatch.failure(400));
});

router.use(function (error, request, response, next) {

  if (error instanceof jwt.UnauthorizedError) {
    response.status(error.status).json(dispatch.failure(error.status, error.inner.message));
    return;
  }

  console.error(error); // TODO standardise error logging
  response.status(500).json(dispatch.failure(500));

});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
