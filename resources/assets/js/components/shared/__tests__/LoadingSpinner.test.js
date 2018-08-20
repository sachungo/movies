import { Loader } from '../';

it('it renders the loading spinner without throwing an error', () => {
  expect(() => shallow(<Loader />)).not.toThrow();
});
