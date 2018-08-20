import MoviesWrapper from '../MoviesWrapper';

describe('The MoviesWrapper component', () => {
  let props;
  beforeEach(() => {
    props = {
      nextPage: 2,
      fetchAll: jest.fn(),
      loading: true
    }
  });

  it('renders without throwing an error with minimal props', () => {
    expect(() => shallow(<MoviesWrapper {...props} />)).not.toThrow();
  });

  it('renders the loading spinner when loading is true', () => {
    const wrapper = shallow(<MoviesWrapper {...props} />);
    expect(wrapper.find('[data-test="movies-loader"]')).toExist();
  });

  it('renders the MoviesWrapper component when loading is false', () => {
    const wrapper = shallow(<MoviesWrapper {...props} loading={false} />);
    expect(wrapper.find('[data-test="movies-list"]')).toExist();
  });
});
