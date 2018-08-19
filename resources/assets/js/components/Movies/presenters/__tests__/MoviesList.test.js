import MoviesList from '../MoviesList';

describe('The MoviesList component', () => {
  let props;
  beforeEach(() => {
    props = { movies: [] };
  });

  it('renders without throwing an error with minimal props', () => {
    expect(() => shallow(<MoviesList {...props} />)).not.toThrow();
  });

  it('renders a list of movies when the movie array has data', () => {
    const wrapper = shallow(
      <MoviesList
        {...props}
        movies={[
          {
            id: 76876785,
            poster_path: '/testing.jpg',
            title: 'Testing movie'
          }
        ]}
      />
    );
    expect(wrapper.find('[data-test="single-movie"]').first()).toExist();
  });
});
