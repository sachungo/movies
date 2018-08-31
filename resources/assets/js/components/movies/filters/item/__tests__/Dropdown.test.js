import React from 'react';
import Dropdown from '../Dropdown';

describe('Dropdown component', () => {
  let props;
  beforeEach(() => {
    props = {
      listItems: [],
      selectedItems: [],
      onChange: jest.fn(),
      hasSelected: false,
      onClear: jest.fn(),
      query: '',
      onSubmit: jest.fn(),
      onClose: jest.fn()
    }
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Dropdown {...props} />)).not.toThrow();
  });

  it('renders the close button', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="close-button"]')).toExist();
  });

  it('renders the clear button of the header element', () => {
    props = {
      ...props,
      hasSelected: true
    };
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="clear-button-mobile"]')).toExist();
  });

  it('renders the unordered list', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="dropdown-list"]')).toExist();
  });

  it('renders the list item', () => {
    props.listItems = [{
      id: 1,
      name: 'Actor 1'
    }];
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="dropdown-list-item"]').first()).toExist();
  });

  it('renders the clear button when an option is selected', () => {
    props = {
      ...props,
      hasSelected: true,
      selectedItems: [2]
    };
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="clear-button"]')).toExist();
  });

  it('renders the apply button', () => {
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.find('[data-test="apply-button"]')).toExist();
  });

  it('resets the selectedItems prop to empty object when the clear button is clicked', () => {
    props = {
      ...props,
      hasSelected: true,
      selectedItems: [2]
    };
    const wrapper = mount(<Dropdown {...props} />);

    wrapper.find('[data-test="clear-button"]').last().simulate('click');
    expect(wrapper.props().onClear).toHaveBeenCalled();
  });

  it('applies the filter when the apply button is clicked', () => {
    props = {
      ...props,
      hasSelected: true,
      selectedItems: [2]
    };
    const wrapper = mount(<Dropdown {...props} />);

    wrapper.find('[data-test="apply-button"]').last().simulate('click');
    expect(wrapper.props().onSubmit).toHaveBeenCalled();
  });
});
