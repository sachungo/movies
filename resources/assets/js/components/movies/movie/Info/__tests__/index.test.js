import React from 'react';
import MovieInfo from '..';

jest.mock('../../cast', () => () => <div />);
jest.mock('../../Navbar', () => () => <div />);

describe('The MovieInfo component', () => {
  let props;

  beforeEach(() => {
    props = {
      data: {},
      genres: [],
      hasGenres: false,
      addInfo: jest.fn(),
      fetchInfo: jest.fn(),
      match: { params: {} },
      loading: false,
      error: ''
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<MovieInfo {...props} />)).not.toThrow();
  });

  it('renders the Loader component when loading prop is true', () => {
    const wrapper = shallow(<MovieInfo {...props} loading />);
    expect(wrapper.find('[data-test="movie-loader"]')).toExist();
  });

  it('renders the StatusMessage component when loading prop is false and there is an error', () => {
    const wrapper = shallow(<MovieInfo {...props} error="Error!" />);
    expect(wrapper.find('[data-test="movie-status"]')).toExist();
  });

  it('renders the Info component when loading and error props are falsy', () => {
    const wrapper = shallow(<MovieInfo {...props} />);
    expect(wrapper.find('[data-test="movie-info"]')).toExist();
  });

  it('executes addInfo prop when shouldAddInfo is set to true', () => {
    const wrapper = mount(
      <MovieInfo
        {...props}
        data={{
          id: 1234
        }}
        shouldAddInfo
      />
    );
    expect(wrapper.props().addInfo).toHaveBeenCalledWith({ id: 1234 });
  });

  it('executes fetchInfo when shouldFetchInfo is truthy', () => {
    const modifiedProps = {
      ...props,
      shouldFetchInfo: true,
      match: {
        params: { id: 12 }
      }
    }
    const wrapper = mount(<MovieInfo {...modifiedProps} />);
    expect(wrapper.props().fetchInfo).toHaveBeenCalledWith(12);
  });
});
