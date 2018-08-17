import Example from '../Example';

describe('Example test', () => {
  it('renders without throwing an error', () => {
    expect(() => shallow(<Example />)).not.toThrow();
  });
});
