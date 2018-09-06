import React, { Component } from 'react';
import styled from 'styled-components';
import { rem, ellipsis } from 'polished';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { styles, colors } from '../../shared';

const Wrapper = styles.DropdownWrapper.extend`
  padding: 0;
  box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.7);
  border: none;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: ${rem('300px')};
  max-height: ${rem('350px')};
  overflow-y: scroll;
`;

const Item = styled(Link)`
  text-decoration: none;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
  transition: all 0.2s;
  padding: ${rem('10px')};
  color: ${colors.text};
  font-weight: 300;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    text-decoration: none;
    background-color: ${colors.translucent};
    color: ${colors.primary};
  }

  &:active {
    text-decoration: none;
    background-color: rgba(0, 206, 209, 0.3);
    color: ${colors.primary};
  }
`;

const EmptyWrapper = Item.withComponent('div');

const Empty = EmptyWrapper.extend`
  width: ${rem('300px')};
  cursor: default;

  &:active,
  &:hover {
    background-color: ${colors.white};
    color: ${colors.text};
    border-radius: ${rem('5px')};
  }
`;

const Title = styled.p`
  margin-bottom: 0;
  font-weight: 400;
`;

const Overview = styled.p`
  ${ellipsis('280px')};
  margin-bottom: 0;
`;

const Dropdown = ({ items, hasResults, text }) => (
  <Wrapper>
    {hasResults && (
      <List>
        {items.map((item, index) => (
          <Item
            key={`${item.id}-${index}`}
            to={{
              pathname: `/movies/${item.id}`,
              state: { data: item }
            }}
            data-test="list-item"
          >
            <Title>{item.title}</Title>
            <Overview>{item.overview}</Overview>
          </Item>
        ))}
      </List>
    )}

    {text && (
      <Empty>{text}</Empty>
    )}
  </Wrapper>
);

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  hasResults: PropTypes.bool,
  text: PropTypes.string
};

export default Dropdown;
