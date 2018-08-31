import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Tags from './Tags';

import { getTags } from '../../../helpers';

const mapStateToProps = state => {
  const tags = getTags(state);
  const buttonText = tags.length > 1 ? 'Clear All' : 'Clear';
  return {
    tags,
    hasTags: !isEmpty(tags),
    buttonText: buttonText
  };
};

const mapDispatchToProps = dispatch => {
  onClear: () => dispatch(clearAllTags(dispatch));
}

const clearAllTags = dispatch => {
  // clear selection
  // if filtered, also reset pagination and apply filter again
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
