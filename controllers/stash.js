/**
 * httpd
 * Stash Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const dispatch = require('../utilities/status');

const DIRECTORY_PREFIX = path.join('public', 'stash');

const regulate = function reciprocateFileWriteStatus (error) {
  return error ? this.response.status(500).json(dispatch.failure(500))
    : this.response.status(200).json(dispatch.success(200, this.intent));
};

const sanitise = function filterDirectoryListing (error, payload) {

  const nodes = [];

  if (error) {
    return this.response.status(500).json(dispatch.failure(500));
  }

  for (const path of payload) {
    path.startsWith('.') ? '' : nodes.push(path);
  }

  this.response.status(200).json(nodes.sort());

};

router.use(express.json(), express.raw(), express.text(), express.urlencoded({ extended: true }));

router.get('/', function (request, response) {
  fs.readdir(DIRECTORY_PREFIX, sanitise.bind({ response: response }));
});

router.all('/', function (request, response, next) {

  let payload;

  if (!Object.keys(request.body).length) {
    return next();
  }

  const timestamp = Number(new Date()).toString();
  const extension = express.static.mime.extension(request.is()) || 'bin';

  if (request.is('application/json')) {
    payload = JSON.stringify(request.body, null, 4);
  } else if (request.is('application/x-www-form-urlencoded')) {
    payload = JSON.stringify(request.body, null, 4);
  } else {
    payload = request.body;
  }

  fs.writeFile(path.join(DIRECTORY_PREFIX, `${timestamp}.${extension}`), payload,
    regulate.bind({ response: response, intent: { filename: `${timestamp}.${extension}` } }));

});

router.use(express.static(DIRECTORY_PREFIX));

router.use(function (request, response, next) {
  response.status(400).json(dispatch.failure(400));
});

router.use(function (error, request, response, next) {
  console.error(error); // TODO standardise error logging
  response.status(500).json(dispatch.failure(500));
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
