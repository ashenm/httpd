const headers = require('./headers');

describe('root/headers.js', () => {
  const response = {
    json: jest.fn().mockReturnThis(),
    render: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  const request = {
    accepts: jest.fn(),
    headers: { 'X-Key': 'x-test-value' }
  };

  describe('text/html', () => {
    // given
    beforeAll(() => {
      request.accepts.mockReturnValueOnce(true);
    });

    // when
    beforeAll(() => {
      headers(request, response);
    });

    // then
    it('Should attempt to resolve content negotiation selection with valid arity', () => {
      expect(request.accepts.mock.calls).toMatchSnapshot();
    });

    it('Should attempt to render response view with valid arity', () => {
      expect(response.render.mock.calls).toMatchSnapshot();
    });

    afterAll(jest.clearAllMocks);
  });

  describe('text/plain', () => {
    // given
    beforeAll(() => {
      request.accepts.mockReturnValueOnce(false);
    });

    // when
    beforeAll(() => {
      headers(request, response);
    });

    // then
    it('Should dispatch response status with valid arity', () => {
      expect(response.status.mock.calls).toMatchSnapshot();
    });

    it('Should dispatch response body with valid arity', () => {
      expect(response.json.mock.calls).toMatchSnapshot();
    });

    afterAll(jest.clearAllMocks);
  });
});
