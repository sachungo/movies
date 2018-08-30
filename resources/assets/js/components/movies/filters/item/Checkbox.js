import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { colors } from '../../../shared';

const Label = styled.label`
  margin-bottom: 0;
`;

const Input = styled.input`
  margin-right: ${rem('8px')};
`;

const Checkbox = ({ item, onChange, checked = false }) => (
  <Label>
    <Input
      type="checkbox"
      name={item.label}
      checked={checked}
      onChange={onChange}
      value={item.id}
      data-test="checkbox-input"
    />
    {item.label}
  </Label>
);

Checkbox.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default Checkbox;
