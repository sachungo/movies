import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, styles } from '../../../shared';
import Dropdown from './Dropdown';

const Wrapper = styled.div`
  flex: 0 0 ${rem('115px')};
  position: relative;
  margin-top: ${rem('10px')};

  ${({ hide }) => hide && css`
    display: none;
  `}
`;

const Item = styled(styles.Button)`
  text-transform: capitalize;
  margin-right: ${rem('10px')};
  transition: all 0.2s ease-out;

  ${({ active }) => active && css`
    font-weight: 500;
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};
  `}

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    background-color: ${colors.disabled};
    border-color: ${colors.disabled};
    color: ${colors.text};
  }

  svg {
    margin-left: ${rem('10px')};
  }
`;

export default class FilterItem extends Component {
  static propTypes = {
    criterion: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
    hasSelected: PropTypes.bool,
    onClear: PropTypes.func,
    query: PropTypes.string,
    onFilter: PropTypes.func,
    options: PropTypes.array,
    resetPagination: PropTypes.func,
    disableFilter: PropTypes.bool,
    isFiltered: PropTypes.bool,
    onReset: PropTypes.func,
    hideFilter: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      appliedFilterCleared: false
    };
    this.filter = createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutOfBounds);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutOfBounds);
  }

  componentDidUpdate(prevProps) {
    const resetItems =
      (this.props.query !== prevProps.query) &&
      this.props.isFiltered &&
      this.state.appliedFilterCleared;

    if (resetItems) {
      this.props.onReset();
      this.props.onFilter(this.props.query);
      this.props.resetPagination();
      this.toggleVisibility();

      this.setState({ appliedFilterCleared: false });
    }
  }

  handleClickOutOfBounds = event => {
    if (this.filter.current.contains(event.target)) {
      return;
    }
    this.setState({ show: false });
  };

  handleSubmit = () => {
    this.props.onReset();
    this.props.onFilter(
      this.props.query
    );
    this.props.resetPagination();
    this.setState({ show: false });
  };

  handleCancel = event => {
    event.nativeEvent.stopImmediatePropagation();

    this.props.onClear();

    if (this.props.isFiltered) {
      this.setState({
        appliedFilterCleared: true
      });
    }
  };

  toggleVisibility = () => {
    if (this.props.disableFilter) {
      return;
    }

    this.setState(prevState => ({
      show: !prevState.show
    }));
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
      options,
      hideFilter
    } = this.props;
    const isYearsFilter = criterion === 'years';
    return (
      <Wrapper innerRef={this.filter} hide={hideFilter}>
        <Item
          data-test="filter-criterion"
          onClick={this.toggleVisibility}
          active={hasSelected || this.state.show}
          disabled={this.props.disableFilter}
        >
          {criterion}
          {this.state.show
            ? <FontAwesomeIcon icon="chevron-up" />
            : <FontAwesomeIcon icon="chevron-down" />
          }
        </Item>
        {this.state.show && (
          <Dropdown
            listItems={options}
            selectedItems={selectedItems}
            onChange={onChange}
            hasSelected={hasSelected}
            onClear={this.handleCancel}
            query={query}
            onSubmit={this.handleSubmit}
            onClose={this.toggleVisibility}
            isYearsFilter={isYearsFilter}
            data-test="filter-list"
          />
        )}
      </Wrapper>
    );
  }
}
