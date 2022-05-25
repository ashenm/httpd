module.exports = function (request, response) {
  response.status(200).json({ ip: request.ip });
}
