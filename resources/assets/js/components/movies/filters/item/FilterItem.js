import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { colors, styles } from '../../../shared';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  flex: 0 0 ${rem('75px')};
  position: relative;
`;

const Item = styled(styles.Button)`
  text-transform: capitalize;

  ${({ active }) => active && css`
    font-weight: 500;
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};
  `}
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
    isFiltered: false,
    show: false
  };

  handleSubmit = () => {
    this.props.onFilter(
      this.props.query
    );
    this.props.resetPagination();
    this.setState({
      isFiltered: true,
      show: false
    });
  };

  handleCancel = () => {
    this.props.onClear();

    if (this.state.isFiltered) {
      this.props.onFilter();
      this.props.resetPagination();
    }

    this.setState({ isFiltered: false });
  };

  toggleVisibility = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  handleMouseLeave = () => {
    this.setState({ show: false });
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
        <Item
          data-test="filter-criterion"
          onClick={this.toggleVisibility}
          active={hasSelected || this.state.show}
        >
          {criterion}
        </Item>
        <Dropdown
          listItems={options}
          selectedItems={selectedItems}
          onChange={onChange}
          hasSelected={hasSelected}
          onClear={this.handleCancel}
          query={query}
          onSubmit={this.handleSubmit}
          show={this.state.show}
          onMouseLeave={this.handleMouseLeave}
          data-test="filter-list"
        />
      </Wrapper>
    );
  }
}
