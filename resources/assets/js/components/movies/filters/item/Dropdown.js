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
    listItems: PropTypes.array.isRequired
  };

  state = {
    selectedItems: new Map()
  };

  handleChange = event => {
    const { checked, value } = event.target;

    this.setState((prevState) => ({
      selectedItems: prevState.selectedItems.set(value, checked)
    }));
  };

  render() {
    const { listItems } = this.props;
    const { selectedItems } = this.state;

    return (
      <Wrapper>
        <List data-test="dropdown-list">
          {listItems.map(item => (
            <Item key={item.id}>
              <Checkbox
                item={item}
                onChange={this.handleChange}
                checked={selectedItems.get(item.id.toString())}
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
