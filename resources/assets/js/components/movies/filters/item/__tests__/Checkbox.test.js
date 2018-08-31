import React from 'react';
import Checkbox from '../Checkbox';

describe('Checkbox component', () => {
  let props;
  beforeEach(() => {
    props = {
      item: {},
      onChange: jest.fn()
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Checkbox {...props} />)).not.toThrow();
  });

  it('renders the checkbox input', () => {
    props = {
      ...props,
      item: {
        label: 'Testing',
        id: 123
      },
      checked: true
    }
    const wrapper = shallow(<Checkbox {...props} />);
    expect(wrapper.find('[data-test="checkbox-input"]')).toExist();
  });
});
