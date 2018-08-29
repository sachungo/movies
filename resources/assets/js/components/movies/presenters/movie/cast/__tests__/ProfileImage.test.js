import React from 'react';
import ProfileImage from '../ProfileImage';

describe('ProfileImage component test', () => {
  let props;
  beforeEach(() => {
    props = {
      name: '',
      profilePath: ''
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<ProfileImage {...props} />)).not.toThrow();
  });

  it('renders the intials when profilePath is undefined or null', () => {
    props = {
      ...props,
      name: 'testing initials'
    };
    const wrapper = shallow(<ProfileImage {...props} />);
    expect(wrapper.find('[data-test="profile-initials"]')).toExist();
  });

  it('renders the profile picture when profilePath has a valid value', () => {
    props = {
      ...props,
      name: 'testing initials',
      profilePath: '/testing.jpg'
    };
    const wrapper = shallow(<ProfileImage {...props} />);
    expect(wrapper.find('[data-test="profile-picture"]')).toExist();
  });
});
