import { connect } from 'react-redux';
import _ from 'lodash';
import MovieCast from './MovieCast';
import { fetchMovieCast } from '../../../../actions/movie';

const mapStateToProps = ({ movie }, { id }) => ({
  loading: movie.loadingCast,
  cast: movie.cast[id],
  hasCast: !_.isEmpty(movie.cast[id]),
  hasCastError: movie.hasCastError
});

const mapDispatchToProps = dispatch => ({
  fetchCast: movieId => dispatch(fetchMovieCast(movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieCast);
