import React from 'react';
import Filter from '../';

jest.mock('../item', () => () => <div />);

describe('Filter component', () => {
  it('renders without throwing an error', () => {
    expect(() => shallow(<Filter />)).not.toThrow();
  });

  it('renders the filter bar', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-bar"]')).toExist();
  });

  it('renders the Actors filter', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-item"]')).toExist();
  });
});
