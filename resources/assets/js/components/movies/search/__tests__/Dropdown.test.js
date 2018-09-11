import React from 'react';
import Dropdown from '../Dropdown';

describe('SEARCH dropdown', () => {
  let props;
  beforeEach(() => {
    props = {
      items: [],
      hasResults: false,
      text: ''
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
      }],
      hasResults: true
    }
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="list-item"]').first()).toExist();
  });

  it('renders the empty message when results not found', () => {
    props = {
      ...props,
      text: 'testing'
    };
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="list-empty"]')).toExist();
  });

  it('renders the error message', () => {
    props = {
      ...props,
      error: 'Error occurred'
    };
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="list-error"]')).toExist();
  });
});
