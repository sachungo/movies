import React from 'react';
import Filter from '../';

jest.mock('../item', () => () => <div />);
jest.mock('../year', () => () => <div />);

describe('Filter component', () => {
  it('renders without throwing an error', () => {
    expect(() => shallow(<Filter />)).not.toThrow();
  });

  it('renders the filter bar', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-bar"]')).toExist();
  });

  it('renders the actors filter', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-actors"]')).toExist();
  });

  it('renders the genres filter', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-genres"]')).toExist();
  });

  it('renders the years filter', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('[data-test="filter-years"]')).toExist();
  });
});
