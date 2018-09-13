import React from 'react';
import { Navbar } from '../Navbar';

describe('Navbar component test', () => {
  let props;
  beforeEach(() => {
    props = {};
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Navbar {...props} />)).not.toThrow();
  });

  it('renders the chevron icon', () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper.find('[data-test="chevron-icon"]')).toExist();
  });

  it('renders the logo', () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper.find('[data-test="logo"]')).toExist();
  });

  it('renders the header', () => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper.find('[data-test="navbar-header"]')).toExist();
  });
});
