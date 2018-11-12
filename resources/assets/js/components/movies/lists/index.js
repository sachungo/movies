import { connect } from 'react-redux';

import MoviesList from './MoviesList';

import { addFavorite } from '../../../actions/favorites';

const mapStateToProps = ({ allMovies }, { page }) => ({
  movies: allMovies.movies[`page_${page}`] || []
});

export default connect(mapStateToProps, {
  addFavorite
})(MoviesList);
