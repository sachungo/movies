import { connect } from 'react-redux';

import MoviesList from './MoviesList';
import { addFavorite, deleteByMovieId } from '../../../actions/favorites';

const mapStateToProps = ({ allMovies, favorites }, { page }) => ({
  movies: allMovies.movies[`page_${page}`] || [],
  favorites: favorites.favorites
});

export default connect(mapStateToProps, {
  addFavorite,
  deleteByMovieId
})(MoviesList);
