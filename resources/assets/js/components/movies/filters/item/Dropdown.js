import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import Checkbox from './Checkbox';
import { colors, styles } from '../../../shared';

const Wrapper = styled.div`
  border: ${rem('1px')} solid ${colors.border};
  border-radius: ${rem('5px')};
  padding: ${rem('20px')};
`;

const List = styled.ul`
  width: ${rem('230px')};
  padding-left: 0;
`;

const Item = styled.li`
  list-style: none;
  margin-bottom: ${rem('8px')};
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }

  &:active {
    color: ${colors.primaryActive};
  }
`;

const ClearButton = styles.Button.extend`
  &:hover {
    background-color: ${colors.white};
  }

  &:active {
    background-color: ${colors.white};
    border-color: ${colors.primaryHover};
    color: ${colors.primary};
  }
`;

const ApplyButton = styles.Button.extend`
  background-color: ${colors.primary};
  border-color: ${colors.primary};
  color: ${colors.white};

  &:hover {
    background-color: ${colors.primaryHover};
    border-color: ${colors.primaryHover};
    color: ${colors.white};
  }

  &:active {
    background-color: ${colors.primaryActive};
    border-color: ${colors.primaryActive};
    color: ${colors.white};
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: ${colors.disabled};
    border-color: ${colors.disabled};
    color: ${colors.text};
  }
`;

const ButtonWrapper = styled.div`
  &:not(:empty) {
    border-top: ${rem('1px')} solid ${colors.border};
    padding-top: ${rem('20px')};
    display: flex;
    justify-content: space-between;
  }
`;

export default class Dropdown extends Component {
  static propTypes = {
    listItems: PropTypes.array.isRequired,
    selectedItems: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    hasSelected: PropTypes.bool,
    onClear: PropTypes.func,
    query: PropTypes.string,
    onFilter: PropTypes.func
  };

  handleChange = event => {
    const { checked, value } = event.target;
    this.props.onChange({
      id: +value,
      isChecked: checked
    })
  };

  handleSubmit = () => {
    this.props.onFilter(
      this.props.query
    );
  };

  handleClear = () => {
    this.props.onClear();
    this.props.onFilter();
  }

  render() {
    const {
      listItems,
      selectedItems,
      hasSelected,
      onClear
    } = this.props;

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

        <ButtonWrapper>
          <ApplyButton
            data-test="apply-button"
            disabled={!hasSelected}
            onClick={this.handleSubmit}
          >
            Apply
          </ApplyButton>

          {hasSelected && (
            <ClearButton
              data-test="clear-button"
              onClick={this.handleClear}
            >
              Clear
            </ClearButton>
          )}
        </ButtonWrapper>
      </Wrapper>
    );
  }
}
