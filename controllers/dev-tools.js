/**
 * httpd
 * Developer Tools
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const express = require('express');
const router = express.Router();
const dispatch = require('../utilities/status');

router.use(express.json());

router.all('/', function (request, response) {
  response.status(200).json(dispatch.success(200, request.body));
});

router.all('/bad-request', function (request, response) {
  response.status(400).json(dispatch.failure(400, request.body));
});

router.all('/not-found', function (request, response) {
  response.status(404).json(dispatch.failure(404, request.body));
});

router.all('/internal-server-error', function (request, response) {
  response.status(500).json(dispatch.failure(404, request.body));
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
