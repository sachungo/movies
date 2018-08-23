import MoviesWrapper from '../MoviesWrapper';

describe('The MoviesWrapper component', () => {
  let props;
  beforeEach(() => {
    props = {
      nextPage: 2,
      fetchAll: jest.fn(),
      fetchGenres: jest.fn(),
      loading: true,
      hasGenres: false,
      hasMovies: false
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

  it('executes the fetchAll call when there are no movies on component mount', () => {
    const wrapper = mount(<MoviesWrapper {...props} />);
    expect(wrapper.props().fetchAll).toHaveBeenCalledWith(2);
  });

  it('executes the fetchGenres call when there are no genres on component mount', () => {
    const wrapper = mount(<MoviesWrapper {...props} />);
    expect(wrapper.props().fetchGenres).toHaveBeenCalled();
  });
});
