import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Tags from './Tags';

import { getTags } from '../../../helpers';
import { reset } from '../../../actions/filters';
import {
  fetchMovies,
  setPaginatorPage,
  reset as moviesReset
} from '../../../actions';

const mapStateToProps = state => {
  const tags = getTags(state);
  const buttonText = tags.length > 1 ? 'Clear All' : 'Clear';
  return {
    tags,
    hasTags: !isEmpty(tags),
    buttonText: buttonText,
    isFiltered: state.allMovies.isFiltered
  };
};

const mapDispatchToProps = dispatch => ({
  onClear: () => dispatch(reset()),
  onFetchMovies: () => dispatch(fetchMovies(1)),
  resetPagination: () => dispatch(setPaginatorPage(1, true)),
  onResetMovies: () => dispatch(moviesReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
