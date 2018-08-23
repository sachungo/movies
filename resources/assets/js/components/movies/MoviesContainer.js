import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';
import { fetchMovies } from '../../actions';
import { fetchGenres } from '../../actions/genres'
import { genresSelector, moviesSelector } from '../../selectors';

const mapStateToProps = ({ allMovies, genres }) => ({
  loading: allMovies.loading,
  nextPage: allMovies.nextPage,
  hasGenres: genresSelector(genres),
  hasMovies: moviesSelector(allMovies)
});

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page)),
  fetchGenres: () => dispatch(fetchGenres())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
