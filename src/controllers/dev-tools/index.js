/**
 * httpd
 * Developer Tools
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.dev
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

router.all('/timeout', function (request, response, _next) {
  const delay = parseInt(request.query.ms);

  if (delay !== delay) {
    return;
  }

  setTimeout(function () {
    response.status(200).json(dispatch.success(200));
  }, delay);
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
