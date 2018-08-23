import { connect } from 'react-redux';
import _ from 'lodash';
import MovieInfo from './MovieInfo';
import { getMovieInfo } from '../../../../helpers';
import { addMovieInfo } from '../../../../actions/movie';
import { getGenresSelector } from '../../../../selectors';

const mapStateToProps = (state, ownProps) => {
  const data = getMovieInfo(state, ownProps);
  const movieGenres = getGenresSelector(state, ownProps);

  return {
    data,
    genres: movieGenres,
    hasGenres: !_.isEmpty(movieGenres)
  }
};

const mapDispatchToProps = dispatch => ({
  addInfo: info => dispatch(addMovieInfo(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
