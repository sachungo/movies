import { connect } from 'react-redux';
import _ from 'lodash';
import MovieInfo from './Info';
import { getMovieInfo, isSameId as movieIdSame } from '../../../helpers';
import { getGenresSelector } from '../../../selectors';
import { addMovieInfo, fetchMovie } from '../../../actions/movie';

const mapStateToProps = (state, ownProps) => {
  const isSameId = movieIdSame(state, ownProps);
  const data = getMovieInfo(state, ownProps);
  const movieGenres = getGenresSelector(state, ownProps);

  const shouldFetchInfo = _.isEmpty(data);
  const shouldAddInfo = !isSameId && !shouldFetchInfo;

  return {
    data,
    genres: movieGenres,
    hasGenres: !_.isEmpty(movieGenres),
    shouldAddInfo,
    shouldFetchInfo,
    loading: state.movie.loading,
    error: state.movie.error
  }
};

const mapDispatchToProps = dispatch => ({
  addInfo: info => dispatch(addMovieInfo(info)),
  fetchInfo: movieId => dispatch(fetchMovie(movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
