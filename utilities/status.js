/**
 * httpd
 * Status Utilities
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const http = require('http');

exports.success = function success (code) {
  return { status: { code: code, message: http.STATUS_CODES[code] } };
};

exports.failure = function failure (code) {
  return { error: { code: code, message: http.STATUS_CODES[code] } };
};

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
