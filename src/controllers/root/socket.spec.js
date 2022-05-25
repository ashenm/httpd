const socket = require('./socket');

describe('root/socket', () => {
  const response = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  const remoteSocket = {
    remoteAddress: 'test-socket-remote-address',
    remoteFamily: 'test-socket-remote-family',
    remotePort: 'test-socket-remote-port'
  };

  // when
  beforeAll(() => {
    socket({ socket: remoteSocket }, response);
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
