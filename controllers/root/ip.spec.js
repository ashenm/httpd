const ip = require('./ip');

describe('root/ip', () => {
  const response = {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis()
  };

  // when
  beforeAll(() => {
    ip({ ip: 'test-ip-address' }, response);
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
