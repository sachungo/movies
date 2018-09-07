import MoviesWrapper from '../MoviesWrapper';

jest.mock('../filters', () => () => <div />);
jest.mock('../tags', () => () => <div />);
jest.mock('../search', () => () => <div />);

describe('The MoviesWrapper component', () => {
  let props;
  beforeEach(() => {
    props = {
      fetchAll: jest.fn(),
      loading: true,
      hasMovies: false,
      totalPaginatorPages: 1,
      query: '',
      totalResults: 5,
      onPaginatorChange: jest.fn(),
      activePage: 1,
      isEmpty: false
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
    expect(wrapper.props().fetchAll).toHaveBeenCalledWith(1);
  });

  it('renders the paginator', () => {
    const wrapper = shallow(
      <MoviesWrapper
        {...props}
        loading={false}
        totalResults={12}
      />
    );
    expect(wrapper.find('[data-test="movies-paginator"]')).toExist();
  });

  it('renders the empty state when isEmpty is true', () => {
    const wrapper = shallow(<MoviesWrapper {...props} loading={false} isEmpty />);
    expect(wrapper.find('[data-test="empty-state"]')).toExist();
  });
});
