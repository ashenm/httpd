module.exports = function (request, response) {

  if (request.accepts('text/html')) {
    response.render('headers', { headers: request.headers });
    return;
  }

  response.status(200).json(request.headers);

}
