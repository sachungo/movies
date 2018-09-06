import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Search from './Search';

import { fetchSearchMovies } from '../../../actions/search';

const mapStatToProps = ({ search }) => ({
  loading: search.loading,
  results: search.results,
  emptyText: search.empty,
  hasResults: !isEmpty(search.results)
});


export default connect(mapStatToProps, {
  onSearch: fetchSearchMovies
})(Search);
