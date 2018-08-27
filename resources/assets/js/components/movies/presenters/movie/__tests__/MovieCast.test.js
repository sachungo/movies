import React from 'react';
import MovieCast from '../MovieCast';

describe('MovieCast component test', () => {
  let props;
  beforeEach(() => {
    props = {
      cast: {
        character: 'Ethan Hunt',
        id: 500,
        name: 'Tom Cruise',
        profile_path: '/3oWEuo0e8Nx8JvkqYCDec2iMY6K.jpg'
      }
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<MovieCast {...props} />)).not.toThrow();
  });

  it('renders the profile picture', () => {
    const wrapper = shallow(<MovieCast {...props} />);
    expect(wrapper.find('[data-test="profile-picture"]')).toExist();
  });

  it('renders the cast information', () => {
    const wrapper = shallow(<MovieCast {...props} />);
    expect(wrapper.find('[data-test="actor-details"]')).toExist();
  })

  it('renders the initials when the profile picture path is null', () => {
    props.cast = {
      character: 'Ethan Hunt',
      id: 500,
      name: 'Tom Cruise'
    };
    const wrapper = shallow(<MovieCast {...props} />);
    expect(wrapper.find('[data-test="actor-initials"]')).toExist();
  });
});
