import React from 'react';
import Poster from '../Poster';

describe('Poster component test', () => {
  let props;
  beforeEach(() => {
    props = {
      posterPath: null
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Poster {...props} />)).not.toThrow();
  });

  it('renders the placeholder when profile path is undefined or null', () => {
    const wrapper = shallow(<Poster {...props} />);
    expect(wrapper.find('[data-test="poster-placeholder"]')).toExist();
  });

  it('renders the poster when profile path has a valid value', () => {
    props = {
      posterPath: '/testing.jpg'
    };
    const wrapper = shallow(<Poster {...props} />);
    expect(wrapper.find('[data-test="poster"]')).toExist();
  });
});
