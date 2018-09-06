import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import Checkbox from './Checkbox';
import { colors, styles, media } from '../../../shared';

const Wrapper = styled.div`
  border: ${rem('1px')} solid ${colors.border};
  border-radius: ${rem('5px')};
  padding: ${rem('20px')};
  position: absolute;
  z-index: 100;
  margin-top: ${rem('7px')};
  background-color: ${colors.white};
  top: 100%;
  left: 0;

  ${media.big`
    height: 100%;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    margin: 0;
    border: none;
  `}
`;

const List = styled.ul`
  width: ${rem('230px')};
  padding-left: 0;
  max-height: ${rem('310px')};
  overflow-y: scroll;

  ${media.big`
    max-height: none;
    overflow-y: visible;
  `}
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

  ${media.big`
    display: none;

    ${({ show }) => show && css`
      display: block;
    `}
  `}
`;

const CloseButton = ClearButton.extend``;

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

  ${media.big`
    width: 100%;
    padding: ${rem('16px')};
  `}
`;

const ButtonWrapper = styled.div`
  &:not(:empty) {
    border-top: ${rem('1px')} solid ${colors.border};
    padding-top: ${rem('20px')};
    display: flex;
    justify-content: space-between;
  }

  ${media.big`
      width: 100%;
  `}
`;

const Header = styled.div`
  display: none;
  height: ${rem('60px')};
  border-bottom: ${rem('1px')} solid ${colors.border};

  ${media.big`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${rem('16px')};
  `}
`;

export default class Dropdown extends Component {
  static propTypes = {
    listItems: PropTypes.array.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
    hasSelected: PropTypes.bool,
    onClear: PropTypes.func,
    query: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    isYearsFilter: PropTypes.bool
  };

  handleChange = event => {
    const { checked, value } = event.target;
    this.props.onChange({
      id: +value,
      isChecked: checked
    })
  };

  render() {
    const {
      listItems,
      selectedItems,
      hasSelected,
      onClear,
      onSubmit,
      onClose,
      isYearsFilter
    } = this.props;

    return (
      <Wrapper>
        <Header>
          <CloseButton
            show
            onClick={onClose}
            data-test="close-button"
          >
            Close
          </CloseButton>
          {hasSelected && (
            <ClearButton
              data-test="clear-button-mobile"
              onClick={onClear}
              show
            >
              Clear
            </ClearButton>
          )}
        </Header>

        <List data-test="dropdown-list">
          {listItems.map(item => (
            <Item key={item.id}>
              <Checkbox
                item={item}
                onChange={this.handleChange}
                checked={selectedItems.includes(item.id)}
                type={isYearsFilter ? 'radio' : 'checkbox'}
                data-test="dropdown-list-item"
              />
            </Item>
          ))}
        </List>

        <ButtonWrapper>
          <ApplyButton
            data-test="apply-button"
            disabled={!hasSelected}
            onClick={onSubmit}
          >
            Apply
          </ApplyButton>

          {hasSelected && (
            <ClearButton
              data-test="clear-button"
              onClick={onClear}
            >
              Clear
            </ClearButton>
          )}
        </ButtonWrapper>
      </Wrapper>
    );
  }
}
