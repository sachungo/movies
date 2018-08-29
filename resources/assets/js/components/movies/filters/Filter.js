import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors } from '../../shared';

import FilterItem from './item';

const FilterBar = styled.div`
  width: 100%;
  padding: ${rem('16px')};
  border-bottom: ${rem('1px')} solid ${colors.border};
  display: flex;
  flex-wrap: wrap;
`;

export default class Filter extends PureComponent {
  render() {
    return(
      <FilterBar data-test="filter-bar">
        <FilterItem
          criterion="Actors"
          data-test="filter-item"
        />
      </FilterBar>
    );
  }
}
