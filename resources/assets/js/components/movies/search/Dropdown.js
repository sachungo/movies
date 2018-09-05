import React, { Component } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
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

export default class Dropdown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { items } = this.props;
    return (
      <Wrapper>
        <List>
          {items.map(item => (
            <Item
              key={item.id}
              to={{
                pathname: `/movies/${item.id}`,
                state: { data: item }
              }}
              data-test="list-item"
            >
              {item.name}
            </Item>
          ))}
        </List>
      </Wrapper>
    );
  }
}
