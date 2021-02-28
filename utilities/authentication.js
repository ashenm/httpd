const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://ashenm.us.auth0.com/.well-known/jwks.json'
  }),

  audience: 'https://ashenm.us.auth0.com/api/v2/',
  issuer: 'https://ashenm.us.auth0.com/',
  algorithms: [ 'RS256' ]
});

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
