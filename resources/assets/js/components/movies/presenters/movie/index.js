import { connect } from 'react-redux';

import MovieInfo from './MovieInfo';
import { addMovieInfo } from '../../../../actions/movie';

const mapStateToProps = ({ movie }) => ({
  data: movie.data,
  loading: movie.loading
});

const mapDispatchToProps = dispatch => ({
  addInfo: info => dispatch(addMovieInfo(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
