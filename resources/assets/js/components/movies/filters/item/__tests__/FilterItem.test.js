import React from 'react';
import FilterItem from '../FilterItem';

describe('FilterItem component', () => {
  let props;
  beforeEach(() => {
    props = {
      criterion: 'Testing'
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<FilterItem {...props} />)).not.toThrow();
  });

  it('renders the filter criterion', () => {
    const wrapper = shallow(<FilterItem {...props} />);
    expect(wrapper.find('[data-test="filter-criterion"]')).toExist();
  });
});
