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
const configuration = require('../../configurations/dev-tools');
const dispatch = require('../../utilities/status');

router.use(express.json());

router.all('/:status', function (request, response, next) {
  request.params.status in configuration ? response.status(configuration[request.params.status].statusCode).json(dispatch.success(configuration[request.params.status].statusCode, request.body)) : next();
});

router.all('/timeout', function (_request, _response, _next) {
  return;
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
