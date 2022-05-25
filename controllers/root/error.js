const dispatch = require('../../utilities/status');

module.exports = function (_request, response) {
  response.status(500).json(dispatch.failure(500));
}
