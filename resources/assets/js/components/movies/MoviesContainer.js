import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';
import { fetchMovies } from '../../actions';
import { fetchGenres } from '../../actions/genres'
import { moviesSelector } from '../../selectors';
import { getQuery } from '../../helpers';

const mapStateToProps = ({ allMovies, genres, filters }) => ({
  loading: allMovies.loading,
  hasMovies: moviesSelector(allMovies),
  paginator: Object.keys(allMovies.movies),
  totalResults: allMovies.totalResults,
  query: getQuery(filters)
});

const mapDispatchToProps = dispatch => ({
  fetchAll: (page, query = '') => dispatch(fetchMovies(page, query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
