import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Tags from './Tags';

import { getTags, getQuery } from '../../../helpers';
import { reset, setSelectedOption } from '../../../actions/filters';
import {
  fetchMovies,
  setPaginatorPage,
  reset as moviesReset
} from '../../../actions';

const mapStateToProps = state => {
  const tags = getTags(state);
  const buttonText = tags.length > 1 ? 'Clear All' : 'Clear';
  const { allMovies, filters } = state;
  return {
    tags,
    hasTags: !isEmpty(tags),
    buttonText: buttonText,
    isFiltered: allMovies.isFiltered,
    totalResults: allMovies.totalResults,
    query: getQuery(filters)
  };
};

const mapDispatchToProps = dispatch => ({
  onClear: () => dispatch(reset()),
  onFetchMovies: query => dispatch(fetchMovies(1, query)),
  resetPagination: () => dispatch(setPaginatorPage(1, true)),
  onResetMovies: () => dispatch(moviesReset()),
  onRemoveTag: (payload, criterion) => dispatch(setSelectedOption(payload, criterion))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
