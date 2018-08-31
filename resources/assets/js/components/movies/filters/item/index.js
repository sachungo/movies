import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import FilterItem from './FilterItem';

import { setSelectedOption, reset } from '../../../../actions/filters';
import { fetchMovies,  setPaginatorPage } from '../../../../actions';
import { getQuery } from '../../../../helpers';

const mapStateToProps = (state, props) => {
  const { filters } = state;
  const { criterion } = props;
  const selectedItems = filters[criterion] || [];
  const filterItems = state[criterion][criterion] || [];

  return {
    selectedItems,
    hasSelected: !isEmpty(selectedItems),
    query: getQuery(filters),
    options: filterItems,
    disableFilter: state[criterion].loading || isEmpty(filterItems)
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: payload =>
    dispatch(setSelectedOption(payload, props.criterion)),
  onClear: () => dispatch(reset(props.criterion)),
  onFilter: query => dispatch(fetchMovies(1, query)),
  resetPagination: () => dispatch(setPaginatorPage(1))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);
