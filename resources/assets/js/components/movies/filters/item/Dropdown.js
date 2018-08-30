import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import Checkbox from './Checkbox';
import { colors, styles } from '../../../shared';

const Wrapper = styled.div`
  border: ${rem('1px')} solid ${colors.border};
  border-radius: ${rem('5px')};
`;

const List = styled.ul`
  padding: ${rem('20px')};
  width: ${rem('300px')};
`;

const Item = styled.li`
  list-style: none;
  margin-bottom: ${rem('8px')};
`;

const ClearButton = styles.Button.extend``;

const ApplyButton = styles.Button.extend``;

const ButtonWrapper = styled.div`
  &:not(:empty) {
    border-top: ${rem('1px')} solid ${colors.border};
  }
`;

export default class Dropdown extends Component {
  static propTypes = {
    listItems: PropTypes.array.isRequired,
    selectedItems: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange = event => {
    const { checked, value } = event.target;
    this.props.onChange({
      id: +value,
      isChecked: checked
    })
  };

  render() {
    const { listItems, selectedItems } = this.props;

    return (
      <Wrapper>
        <List data-test="dropdown-list">
          {listItems.map(item => (
            <Item key={item.id}>
              <Checkbox
                item={item}
                onChange={this.handleChange}
                checked={selectedItems[item.id]}
                data-test="dropdown-list-item"
              />
            </Item>
          ))}
        </List>

        <ButtonWrapper></ButtonWrapper>
      </Wrapper>
    );
  }
}
