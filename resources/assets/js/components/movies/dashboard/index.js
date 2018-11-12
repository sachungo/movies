import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Dashboard from './Dashboard';

import {
  fetchFavorites,
  deleteFavorite
} from '../../../actions/favorites';

const mapStateToProps = ({ favorites }) => ({
  favorites: favorites.favorites,
  hasFavorites: !isEmpty(favorites.favorites),
  error: favorites.error
});

export default connect(mapStateToProps, {
  fetchFavorites,
  deleteFavorite
})(Dashboard);
