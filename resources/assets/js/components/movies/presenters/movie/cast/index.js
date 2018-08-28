import { connect } from 'react-redux';
import _ from 'lodash';
import MovieCast from './MovieCast';
import {
  fetchMovieCast,
  addMovieCastInfo
} from '../../../../../actions/movie';

const mapStateToProps = ({ movie }) => ({
  loading: movie.loadingCast,
  cast: movie.cast,
  hasCast: !_.isEmpty(movie.cast)
});

const mapDispatchToProps = dispatch => ({
  fetchCast: movieId => dispatch(fetchMovieCast(movieId)),
  resetCast: () => dispatch(addMovieCastInfo([]))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieCast);
