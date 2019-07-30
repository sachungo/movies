import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Dashboard from './Dashboard';

import {
  deleteByFavoriteId
} from '../../../actions/favorites';

const mapStateToProps = ({ favorites }) => ({
  favorites: favorites.favorites,
  hasFavorites: !isEmpty(favorites.favorites),
  error: favorites.error,
  loading: favorites.loading
});

export default connect(mapStateToProps, {
  deleteByFavoriteId
})(Dashboard);
