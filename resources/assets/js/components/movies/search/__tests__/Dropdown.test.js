import React from 'react';
import Dropdown from '../Dropdown';

describe('SEARCH dropdown', () => {
  let props;
  beforeEach(() => {
    props = {
      items: []
    };
  });

  it('renders withouth throwing an error', () => {
    expect(() => shallow(<Dropdown {...props} />)).not.toThrow();
  });

  it('renders the list', () => {
    props = {
      ...props,
      items: [{
        id: 1234,
        name: 'Search Item'
      }]
    }
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="list-item"]').first()).toExist();
  });
});
