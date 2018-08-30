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
const Item = styled(styles.Button)`
  text-transform: capitalize;
`;

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
    criterion: PropTypes.string.isRequired,
    selectedItems: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    hasSelected: PropTypes.bool,
    onClear: PropTypes.func,
    query: PropTypes.string,
    onFilter: PropTypes.func
  }

  render() {
    const {
      criterion,
      selectedItems,
      onChange,
      hasSelected,
      onClear,
      query,
      onFilter
    } = this.props;
    return (
      <Wrapper>
        <Item data-test="filter-criterion">{criterion}</Item>
        <Dropdown
          listItems={dummyData}
          selectedItems={selectedItems}
          onChange={onChange}
          hasSelected={hasSelected}
          onClear={onClear}
          query={query}
          onFilter={onFilter}
          data-test="filter-list"
        />
      </Wrapper>
    );
  }
}
