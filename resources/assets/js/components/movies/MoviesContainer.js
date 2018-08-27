import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';
import { fetchMovies } from '../../actions';
import { fetchGenres } from '../../actions/genres'
import { moviesSelector } from '../../selectors';

const mapStateToProps = ({ allMovies, genres }) => ({
  loading: allMovies.loading,
  nextPage: allMovies.nextPage,
  hasMovies: moviesSelector(allMovies),
  paginator: Object.keys(allMovies.movies)
});

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
