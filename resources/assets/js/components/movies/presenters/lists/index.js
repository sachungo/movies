import { connect } from 'react-redux';

import MoviesList from './MoviesList';

const mapStateToProps = ({ allMovies }, { page }) => ({
  movies: allMovies.movies[`page-${page}`] || []
});

export default connect(mapStateToProps)(MoviesList);
