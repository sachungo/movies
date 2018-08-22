import { connect } from 'react-redux';
import _ from 'lodash';
import MovieInfo from './MovieInfo';
import { addMovieInfo } from '../../../../actions/movie';

const mapStateToProps = ({ movie }, ownProps) => {
  const info = _.get(ownProps.location, 'state.data', {});
  const data = _.isEmpty(movie.data) ? info : movie.data;

  return {
    data,
    genres: movie.genres,
    hasGenres: !_.isEmpty(movie.genres)
  }
};

const mapDispatchToProps = dispatch => ({
  addInfo: info => dispatch(addMovieInfo(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
