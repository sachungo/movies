import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors, styles } from '../../../shared';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  flex: 0 0 75px;
`;

// TODO: button is active when dropdown is visible
const Item = styled(styles.Button)``;

const dummyData = [
  {
    id: 1,
    label: 'Actor 1'
  },
  {
    id: 2,
    label: 'Actor 2'
  },
  {
    id: 3,
    label: 'Actor 3'
  },
  {
    id: 4,
    label: 'Actor 4'
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