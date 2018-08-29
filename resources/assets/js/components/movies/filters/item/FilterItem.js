import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors } from '../../../shared';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  flex: 0 0 75px;
`;

// TODO: button is active when dropdown is visible
const Item = styled.button`
  background: none;
  padding: ${rem('4px')} ${rem('16px')};
  border-radius: ${rem('4px')};
  color: ${colors.text};
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  border-color: ${colors.border};

  &:hover {
    border-color: ${colors.primary};
    background-color: ${colors.translucent};
    color: ${colors.primary};
    font-weight: 300;
  }

  &:active {
    font-weight: 500;
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};
  }
`;

const dummyData = [
  {
    id: 1,
    label: 'Actor 1',
    key: 'actor-1'
  },
  {
    id: 2,
    label: 'Actor 2',
    key: 'actor-2'
  },
  {
    id: 3,
    label: 'Actor 3',
    key: 'actor-3'
  },
  {
    id: 4,
    label: 'Actor 4',
    key: 'actor-4'
  },
];

export default class FilterItem extends PureComponent {
  static propTypes = {
    criterion: PropTypes.string.isRequired
  }

  render() {
    const { criterion } = this.props;
    return (
      <Wrapper>
        <Item data-test="filter-criterion">{criterion}</Item>
        <Dropdown
          listItems={dummyData}
          data-test="filter-list"
        />
      </Wrapper>
    );
  }
}
