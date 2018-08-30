import { connect } from 'react-redux';
import FilterItem from './FilterItem';

import { setSelectedOption, reset } from '../../../../actions/filters';
import { fetchMovies,  setPaginatorPage } from '../../../../actions';
import { getQuery } from '../../../../helpers';

const checkIfOptionSelected = options => (
  Object.values(options).includes(true)
);

const getOptions = (state, props) => {
  const options = state[props.criterion];
  return options[props.criterion];
};

const mapStateToProps = (state, props) => {
  const { filters } = state;
  const selectedItems = filters[props.criterion] || {};
  return {
    selectedItems,
    hasSelected: checkIfOptionSelected(selectedItems),
    query: getQuery(filters),
    options: getOptions(state, props) || []
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
