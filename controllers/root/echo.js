const dispatch = require('../../utilities/status');

module.exports = function (request, response) {
  response.status(200).type(request.get('Content-Type') || 'application/json').send(request.is() !== null ? request.body : dispatch.success(200));
}
