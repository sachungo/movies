import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Search from './Search';

import { fetchSearchMovies, reset, setValue } from '../../../actions/search';

const mapStatToProps = ({ search }) => ({
  loading: search.loading,
  results: search.results,
  emptyText: search.empty,
  value: search.value,
  hasResults: !isEmpty(search.results),
  error: search.error
});

export default connect(mapStatToProps, {
  onSearch: fetchSearchMovies,
  onReset: reset,
  onChange: setValue
})(Search);
