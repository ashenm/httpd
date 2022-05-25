const echo = require('./echo');
const dispatch = require('../../utilities/status');

jest.mock('../../utilities/status');

describe('root/echo', () => {
  const response = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis()
  };

  const request = {
    headers: { 'X-Key': 'x-test-value' },
    get: jest.fn(),
    is: jest.fn()
  };

  describe('application/json', () => {
    // given
    beforeAll(() => {
      request.get.mockReturnValueOnce(null);
      request.is.mockReturnValueOnce(null);
      jest.spyOn(dispatch, 'success').mockReturnValueOnce('test-dispatch-success-value');
    });

    // when
    beforeAll(() => {
      echo(request, response);
    });

    // then
    it('Should attempt to resolve default response body with valid arity', () => {
      expect(jest.spyOn(dispatch, 'success').mock.calls).toMatchSnapshot();
    });

    it('Should dispatch response status with valid arity', () => {
      expect(response.status.mock.calls).toMatchSnapshot();
    });

    it('Should dispatch response body with valid arity', () => {
      expect(response.send.mock.calls).toMatchSnapshot();
    });

    afterAll(jest.clearAllMocks);
  });

  describe('text/plain', () => {
    // given
    beforeAll(() => {
      request.get.mockReturnValueOnce('text/plain');
      request.is.mockReturnValueOnce(false);
    });

    // when
    beforeAll(() => {
      echo({ ...request, body: 'test-request-body' }, response);
    });

    // then
    it('Should not attempt to resolve default response body', () => {
      expect(jest.spyOn(dispatch, 'success')).not.toBeCalled();
    });

    it('Should dispatch response status with valid arity', () => {
      expect(response.status.mock.calls).toMatchSnapshot();
    });

    it('Should dispatch response body with valid arity', () => {
      expect(response.send.mock.calls).toMatchSnapshot();
    });

    afterAll(jest.clearAllMocks);
  });
});
