import React from 'react';
import Actor from '../Actor';

describe('Actor component test', () => {
  let props;
  beforeEach(() => {
    props = {
      actor: {
        character: 'Ethan Hunt',
        id: 500,
        name: 'Tom Cruise',
        profile_path: '/3oWEuo0e8Nx8JvkqYCDec2iMY6K.jpg'
      }
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Actor {...props} />)).not.toThrow();
  });

  it('renders the profile picture', () => {
    const wrapper = shallow(<Actor {...props} />);
    expect(wrapper.find('[data-test="actor-profile-image"]')).toExist();
  });

  it('renders the actor information', () => {
    const wrapper = shallow(<Actor {...props} />);
    expect(wrapper.find('[data-test="actor-details"]')).toExist();
  })
});
