import React from 'react';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

jest.mock('@fortawesome/react-fontawesome');

describe('Search component', () => {
  let props;
  beforeEach(() => {
    props = {};
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Search {...props} />)).not.toThrow()
  });

  it('renders the search icon', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('[data-test="search-icon"]')).toContainReact(
      <FontAwesomeIcon icon="search" />
    );
  });

  it('renders the input box', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('[data-test="search-input"]')).toHaveTagName('Search__Input');
  });

  it('renders the loading spinner', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('[data-test="search-loading"]')).toExist();
  });

  it('renders the dropdown', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find('[data-test="search-dropdown"]')).toExist();
  });
});
