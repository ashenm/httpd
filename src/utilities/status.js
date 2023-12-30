/**
 * httpd
 * Status Utilities
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.dev
 *
 */

const http = require('http');

exports.success = function success (code, message) {
  return { status: { code: code, message: message || http.STATUS_CODES[code] } };
};

exports.failure = function failure (code, message) {
  return { error: { code: code, message: message || http.STATUS_CODES[code] } };
};

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
