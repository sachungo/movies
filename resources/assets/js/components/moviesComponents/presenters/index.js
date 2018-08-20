import { connect } from 'react-redux';

import MoviesList from './MoviesList';

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(MoviesList);
