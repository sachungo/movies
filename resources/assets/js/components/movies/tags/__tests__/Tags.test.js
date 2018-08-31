import React from 'react';
import Tags from '../Tags';

describe('Tags component', () => {
  let props;
  beforeEach(() => {
    props = {
      tags: [],
      buttonText: '',
      hasTags: true,
      onClear: jest.fn()
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Tags {...props} />)).not.toThrow();
  });

  it('renders the Tag component', () => {
    props = {
      ...props,
      tags: [{
        id: 1,
        name: 'Tag'
      }]
    }
    const wrapper = shallow(<Tags {...props} />);
    expect(wrapper.find('[data-test="tag"]').first()).toExist();
  });

  it('renders the clear button', () => {
    props = {
      ...props,
      buttonText: 'Clear'
    }
    const wrapper = shallow(<Tags {...props} />);
    expect(wrapper.find('[data-test="clear-tag"]')).toExist();
  });

  it('executes the onClear prop of click of the clear button', () => {
    props = {
      ...props,
      buttonText: 'Clear'
    }
    const wrapper = mount(<Tags {...props} />);
    wrapper.find('[data-test="clear-tag"]').last().simulate('click');
    expect(wrapper.props().onClear).toHaveBeenCalled();
  });
});
