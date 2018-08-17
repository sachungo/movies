import { connect } from 'react-redux';

import MoviesLists from './MoviesLists';

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(MoviesLists);
