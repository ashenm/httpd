/**
 *
 * Seize
 * A webresource downloader
 * https://github.com/ashenm/seize
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const http = require('http');
const https = require('https');
const path = require('path');

const requesters = {
  'http:': http,
  'https:': https
};

http.createServer(function (req, res) {

  let remote;

  const url = new URL(req.url, `http://localhost:${process.env.PORT}`);

  // only allow GET requests
  if (!/GET/.test(req.method)) {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 400, message: res.statusMessage } }));
    return;
  }

  // route handler for webroot
  if (/^\/$/.test(url.pathname)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: { code: 200, message: res.statusMessage } }));
    return;
  }

  try {
    remote = new URL(url.searchParams.get('url'));
  } catch (e) {
    remote = null;
  }

  if (!remote) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 400, message: res.statusMessage } }));
    return;
  }

  // route handler for /seize?url=
  if (/^\/seize$/.test(url.pathname)) {

    if (!(remote.protocol in requesters)) {
      res.writeHead(501, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 501, message: res.statusMessage } }));
      return;
    }

    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(remote.pathname)}`);
    requesters[remote.protocol].get(remote.href, r => r.pipe(res));
    return;

  }

  // route handler for /peek?url=
  if (/^\/peek$/.test(url.pathname)) {
    res.setHeader('Content-Type', 'application/json');
    requesters[remote.protocl].get(remote.href, r => res.end(JSON.stringify(r.headers)));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: { code: 404, message: res.statusMessage } }));

}).listen(process.env.PORT || 8080);

// vim: set expandtab shiftwidth=2:
