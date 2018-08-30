import { connect } from 'react-redux';
import FilterItem from './FilterItem';

import { setSelectedOption, reset } from '../../../../actions/filters';
import { fetchMovies } from '../../../../actions';
import { getQuery } from '../../../../helpers';

const checkIfOptionSelected = options => (
  Object.values(options).includes(true)
);

const mapStateToProps = ({ filters }, props) => {
  const selectedItems = filters[props.criterion] || {};
  return {
    selectedItems,
    hasSelected: checkIfOptionSelected(selectedItems),
    query: getQuery(filters)
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: payload =>
    dispatch(setSelectedOption(payload, props.criterion)),
  onClear: () => dispatch(reset(props.criterion)),
  onFilter: query => dispatch(fetchMovies(1, query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);
