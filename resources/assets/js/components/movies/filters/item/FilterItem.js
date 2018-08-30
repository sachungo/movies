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

export default class FilterItem extends PureComponent {
  static propTypes = {
    criterion: PropTypes.string.isRequired,
    selectedItems: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    hasSelected: PropTypes.bool,
    onClear: PropTypes.func,
    query: PropTypes.string,
    onFilter: PropTypes.func,
    options: PropTypes.array,
    resetPagination: PropTypes.func
  }

  state = {
    isFiltered: false
  };

  handleSubmit = () => {
    this.props.onFilter(
      this.props.query
    );
    this.props.resetPagination();
    this.setState({ isFiltered: true });
  };

  handleCancel = () => {
    this.props.onClear();

    if (this.state.isFiltered) {
      this.props.onFilter();
      this.props.resetPagination();
    }

    this.setState({ isFiltered: false });
  };

  render() {
    const {
      criterion,
      selectedItems,
      onChange,
      hasSelected,
      onClear,
      query,
      onFilter,
      options
    } = this.props;
    return (
      <Wrapper>
        <Item data-test="filter-criterion">{criterion}</Item>
        <Dropdown
          listItems={options}
          selectedItems={selectedItems}
          onChange={onChange}
          hasSelected={hasSelected}
          onClear={this.handleCancel}
          query={query}
          onSubmit={this.handleSubmit}
          data-test="filter-list"
        />
      </Wrapper>
    );
  }
}
