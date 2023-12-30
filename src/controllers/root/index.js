/**
 * httpd
 * Root Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.dev
 *
 */

const express = require('express');
const router = express.Router();

const dispatch = require('../../utilities/status');
const logger = require('../../utilities/logger')('root');

router.use(express.static('public'));
router.use(express.json(), express.raw(), express.text(), express.urlencoded({ extended: true }));

router.get('/', function (_request, response) {
  response.status(200).json(dispatch.success(200));
});

router.all('/echo', require('./echo'));
router.all('/headers', require('./headers'));
router.all('/ip', require('./ip'));
router.get('/socket', require('./socket'));

router.use(function (_request, response, next) {
  response.status(404).json(dispatch.failure(404));
});

router.use(function (error, _request, response, _next) {

  logger.error({
    message: "Uncaught internal server error",
    error
  });

  response.status(500).json(dispatch.failure(500));

});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
