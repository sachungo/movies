import React from 'react';
import MovieCast from '../MovieCast';

describe('MovieCast component test', () => {
  let props;
  beforeEach(() => {
    props = {
      loading: false,
      cast: [],
      hasCast: false,
      fetchCast: jest.fn(),
      shouldFetchCast: false,
      id: '12',
      resetCast: jest.fn()
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<MovieCast {...props} />)).not.toThrow();
  });

  it('renders the Loader when cast is still loading', () => {
    const wrapper = shallow(<MovieCast {...props} loading />);
    expect(wrapper.find('[data-test="movie-cast-loader"]')).toExist();
  });

  it('fetches the cast information when there is none', () => {
    const wrapper = mount(
      <MovieCast
        {...props}
        shouldFetchCast
      />
    );

    expect(wrapper.props().fetchCast).toHaveBeenCalledWith('12');
  });

  it('resets the cast information when shouldFetchCast is true', () => {
    const wrapper = mount(
      <MovieCast
        {...props}
        shouldFetchCast
      />
    );

    expect(wrapper.props().resetCast).toHaveBeenCalled();
  });

  it('renders the cast information', () => {
    const wrapper = shallow(
      <MovieCast
        hasCast
        cast={[{
          id: 234,
          name: 'Tom Cruise',
          character: 'Ethan Hunt',
          profile_path: '/3oWEuo0e8Nx8JvkqYCDec2iMY6K.jpg'
        }]}
      />
    );

    expect(wrapper.find('[data-test="movie-actor"]').first()).toExist();
  });
});
