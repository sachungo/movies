import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import FilterItem from './FilterItem';

import { setSelectedOption, reset } from '../../../../actions/filters';
import {
  fetchMovies,
  setPaginatorPage,
  reset as moviesReset
} from '../../../../actions';
import { getQuery } from '../../../../helpers';

const mapStateToProps = (state, props) => {
  const { filters, allMovies } = state;
  const { criterion } = props;
  const selectedItems = filters[criterion] || [];
  const filterItems = state[criterion][criterion] || [];

  return {
    selectedItems,
    hasSelected: !isEmpty(selectedItems),
    query: getQuery(filters),
    options: filterItems,
    disableFilter: state[criterion].loading || isEmpty(filterItems),
    isFiltered: allMovies.isFiltered,
    hideFilter: !!state[criterion].error
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: payload =>
    dispatch(setSelectedOption(payload, props.criterion)),
  onClear: () => dispatch(reset(props.criterion)),
  onFilter: query => dispatch(fetchMovies(1, query)),
  resetPagination: () => dispatch(setPaginatorPage(1, true)),
  onReset: () => dispatch(moviesReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);
