const status = require('./status');

describe('Function success', () => {
  it('Should return well-formed response when message explicitly specified', () => {
    expect(status.success(200, 'Hooray!')).toMatchSnapshot();
  });

  it('Should return well-formed response with a default status text when message unspecified', () => {
    expect(status.success(200)).toMatchSnapshot();
  });
});

describe('Function failure', () => {
  it('Should return well-formed response when message explicitly specified', () => {
    expect(status.failure(400, 'Boo!')).toMatchSnapshot();
  });

  it('Should return well-formed response with a default status text when message unspecified', () => {
    expect(status.failure(400)).toMatchSnapshot();
  });
});
