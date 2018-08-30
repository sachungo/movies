import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';
import { fetchMovies } from '../../actions';
import { fetchGenres } from '../../actions/genres'
import { moviesSelector } from '../../selectors';

// The API gives 20 results, whereas the paginator works with 10
// per page. Therefore, the totalPages are multiplied by 2,
// thereby, resulting to MULTIPLIER declaration
const MULTIPLIER = 2;

const mapStateToProps = ({ allMovies, genres }) => ({
  loading: allMovies.loading,
  hasMovies: moviesSelector(allMovies),
  paginator: Object.keys(allMovies.movies),
  totalPaginatorPages: allMovies.totalPages * MULTIPLIER
});

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
