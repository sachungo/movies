import Dashboard from '../Dashboard';

describe('The Dashboard component', () => {
  let props;
  beforeEach(() => {
    props = {
      favorites: [],
      hasFavorites: false
    };
  });

  it('renders without throwing an error with minimal props', () => {
    expect(() => shallow(<Dashboard {...props} />)).not.toThrow();
  });

  it('renders the status message when there are no favorites', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.find('[data-test="favorites-empty-state"]')).toExist();
  });
});
