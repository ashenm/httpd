module.exports = function (request, response) {
  response.status(200).json({ address: request.socket.remoteAddress, family: request.socket.remoteFamily, port: request.socket.remotePort });
}
