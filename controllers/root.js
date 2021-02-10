/**
 * httpd
 * Root Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const express = require('express');
const router = express.Router();

const dispatch = require('../utilities/status');

router.use(express.static('public'));
router.use(express.json(), express.raw(), express.text(), express.urlencoded({ extended: true }));

router.get('/', function (request, response) {
  response.status(200).json(dispatch.success(200));
});

router.all('/echo', function (request, response) {
  response.status(200).type(request.get('Content-Type') || 'application/json').send(request.is() !== null ? request.body : dispatch.success(200));
});

router.all('/error', function (request, response) {
  response.status(500).json(dispatch.failure(500));
});

router.all('/headers', function (request, response) {

  if (request.accepts('text/html')) {
    response.render('headers', { headers: request.headers });
    return;
  }

  response.status(200).json(request.headers);

});

router.use(function (request, response, next) {
  response.status(404).json(dispatch.failure(404));
});

router.use(function (error, request, response, next) {
  console.error(error); // TODO standardise error logging
  response.status(500).json(dispatch.failure(500));
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
