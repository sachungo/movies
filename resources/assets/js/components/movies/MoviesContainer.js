import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';
import { fetchMovies, setPaginatorPage } from '../../actions';
import { fetchGenres } from '../../actions/genres'
import { moviesSelector } from '../../selectors';
import { getQuery } from '../../helpers';

const mapStateToProps = ({ allMovies, genres, filters }) => ({
  loading: allMovies.loading,
  hasMovies: moviesSelector(allMovies),
  paginator: Object.keys(allMovies.movies),
  totalResults: allMovies.totalResults,
  query: getQuery(filters),
  activePage: allMovies.activePage,
  isEmpty: allMovies.isEmpty
});

const mapDispatchToProps = dispatch => ({
  fetchAll: (page, query = '') => dispatch(fetchMovies(page, query)),
  onPaginatorChange: page => dispatch(setPaginatorPage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
