import { connect } from 'react-redux';
import FilterItem from './FilterItem';

import { setSelectedOption, reset } from '../../../../actions/filters';

const checkIfOptionSelected = options => (
  Object.values(options).includes(true)
);

const mapStateToProps = ({ filters }, props) => {
  const selectedItems = filters[props.criterion] || {};
  return {
    selectedItems,
    hasSelected: checkIfOptionSelected(selectedItems)
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: payload =>
    dispatch(setSelectedOption(payload, props.criterion)),
  onClear: () => dispatch(reset(props.criterion))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);
