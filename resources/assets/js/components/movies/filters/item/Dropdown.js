import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import Checkbox from './Checkbox';
import { colors } from '../../../shared';

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

export default class Dropdown extends PureComponent {
  static propTypes = {
    listItems: PropTypes.array.isRequired
  };

  handleChange = (event, item) => {
    // 
  };

  render() {
    const { listItems } = this.props;
    return (
      <Wrapper>
        <List data-test="dropdown-list">
          {listItems.map(item => (
            <Item>
              <Checkbox
                key={item.id}
                item={item}
                onChange={this.handleChange}
                checked={false}
                data-test="dropdown-list-item"
              />
            </Item>
          ))}
        </List>
      </Wrapper>
    );
  }
}
