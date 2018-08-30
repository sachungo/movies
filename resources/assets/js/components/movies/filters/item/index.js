import { connect } from 'react-redux';
import FilterItem from './FilterItem';

import { setSelectedOption } from '../../../../actions/filters';

const mapStateToProps = ({ filters }, props) => ({
  selectedItems: filters[props.criterion] || {}
});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: payload =>
    dispatch(setSelectedOption(payload, props.criterion))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterItem);
