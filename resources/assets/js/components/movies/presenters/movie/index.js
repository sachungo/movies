import { connect } from 'react-redux';
import _ from 'lodash';
import MovieInfo from './MovieInfo';
import { getMovieInfo } from '../../../../helpers';
import { getGenresSelector } from '../../../../selectors';
import { addMovieInfo, fetchMovie } from '../../../../actions/movie';

const mapStateToProps = (state, ownProps) => {
  const data = getMovieInfo(state, ownProps);
  const movieGenres = getGenresSelector(state, ownProps);

  const { movie } = state;
  const isSameId = data.id === +ownProps.match.params.id;
  const shouldFetchInfo = _.isEmpty(data);
  const shouldAddInfo = !movie.hasInfo && !shouldFetchInfo && !isSameId;

  return {
    data,
    genres: movieGenres,
    hasGenres: !_.isEmpty(movieGenres),
    shouldAddInfo,
    shouldFetchInfo,
    loading: movie.loading,
    cast: movie.cast,
    hasCast: !_.isEmpty(movie.cast)
  }
};

const mapDispatchToProps = dispatch => ({
  addInfo: info => dispatch(addMovieInfo(info)),
  fetchInfo: movieId => dispatch(fetchMovie(movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
