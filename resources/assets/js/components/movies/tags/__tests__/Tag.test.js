import React from 'react';
import Tag from '../Tag';

describe('Tag component', () => {
  let props;
  beforeEach(() => {
    props = {
      tag: {},
      onClick: jest.fn()
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Tag {...props} />)).not.toThrow();
  });

  it('renders the Tag component', () => {
    props = {
      ...props,
      tag: {
        name: 'Tag'
      }
    }
    const wrapper = shallow(<Tag {...props} />);
    expect(wrapper.find('[data-test="individual-tag"]')).toExist();
  });
});
