import { connect } from 'react-redux';

import MoviesList from './MoviesList';

const mapStateToProps = ({ allMovies }) => ({
  movies: allMovies.movies
});

export default connect(mapStateToProps)(MoviesList);
