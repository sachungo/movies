import React from 'react';
import FilterItem from '../FilterItem';

describe('FilterItem component', () => {
  let props;
  beforeEach(() => {
    props = {
      criterion: 'Testing',
      selectedItems: [],
      onChange: jest.fn(),
      hasSelected: false,
      onClear: jest.fn(),
      query: '',
      onFilter: jest.fn(),
      options: [],
      resetPagination: jest.fn(),
      disableFilter: false
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<FilterItem {...props} />)).not.toThrow();
  });

  it('renders the filter criterion', () => {
    const wrapper = shallow(<FilterItem {...props} />);
    expect(wrapper.find('[data-test="filter-criterion"]')).toExist();
  });

  it('renders the filter items', () => {
    const wrapper = shallow(<FilterItem {...props} />);
    wrapper.setState({ show: true });
    expect(wrapper.find('[data-test="filter-list"]')).toExist();
  });
});
