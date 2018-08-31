import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors, styles } from '../../shared';

import FilterItem from './item';

const FilterBar = styles.Container.extend``;

export default class Filter extends PureComponent {
  render() {
    return(
      <FilterBar data-test="filter-bar">
        <FilterItem
          criterion="actors"
          data-test="filter-actors"
        />
        <FilterItem
          criterion="genres"
          data-test="filter-genres"
        />
      </FilterBar>
    );
  }
}
