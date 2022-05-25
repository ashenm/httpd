/**
 * httpd
 * Stash Router
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const stringify = require('json-stringify-safe');
const util = require('util');

const dispatch = require('../utilities/status');
const logger = require('../utilities/logger')('stash');

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

const notify = function dispatchSlackNotification (filename, payload) {

  if (!process.env.SLACK_CHANNEL) {
    return;
  }

  const form = new FormData();

  form.append('content', payload);
  form.append('filename', filename);
  form.append('filetype', path.extname(filename).replace(/^\./, ''));
  form.append('channels', process.env.SLACK_CHANNEL);

  return axios.post('https://slack.com/api/files.upload', form.getBuffer(), {
    headers: { ...form.getHeaders(), Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
  });

};

router.use(express.json(), express.raw(), express.text(), express.urlencoded({ extended: true }));

router.get('/', function (request, response) {
  fs.readdir(DIRECTORY_PREFIX, sanitise.bind({ response: response }));
  notify('incoming-request.json', JSON.stringify({ headers: request.headers, httpVersion: request.httpVersion }));
});

router.all('/', function (request, response, next) {

  let payload;

  if (!Object.keys(request.body).length) {
    return next();
  }

  const timestamp = Number(new Date()).toString();
  const extension = express.static.mime.extension(request.is()) || 'bin';

  const filename = `${timestamp}.${extension}`;

  if (request.is('application/json')) {
    payload = JSON.stringify(request.body, null, 4);
  } else if (request.is('application/x-www-form-urlencoded')) {
    payload = JSON.stringify(request.body, null, 4);
  } else {
    payload = request.body;
  }

  util.callbackify(() => Promise.all([
    fs.promises.writeFile(path.join(DIRECTORY_PREFIX, `${filename}`), payload),
    notify(filename, JSON.stringify({ headers: request.headers, httpVersion: request.httpVersion, ip: request.ip, method: request.method, payload: request.body, url: request.url }, null, 4))
  ]))(regulate.bind({ response: response, intent: { filename } }));

});

router.use(express.static(DIRECTORY_PREFIX));

router.use(function (request, response, next) {
  response.status(400).json(dispatch.failure(400));
});

router.use(function (error, request, response, next) {
  logger.error({
    message: "Uncaught internal server error",
    event: { raw: stringify(error) }
  });

  response.status(500).json(dispatch.failure(500));
});

module.exports = router;

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
