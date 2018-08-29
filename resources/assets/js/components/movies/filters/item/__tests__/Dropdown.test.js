import React from 'react';
import Dropdown from '../Dropdown';

describe('Dropdown component', () => {
  let props;
  beforeEach(() => {
    props = {
      listItems: []
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Dropdown {...props} />)).not.toThrow();
  });

  it('renders the unordered list', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="dropdown-list"]')).toExist();
  });

  it('renders the list item', () => {
    props.listItems = [{
      id: 1,
      label: 'Actor 1',
      selected: false,
      key: 'actor-1'
    }];
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="dropdown-list-item"]').first()).toExist();
  });
});
