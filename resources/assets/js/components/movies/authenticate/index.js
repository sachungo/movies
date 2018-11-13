import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './Navbar';
import { logout } from '../../../actions/authentication';
import { fetchFavorites } from '../../../actions/favorites';
import { isAuthenticated, getUser } from '../../../helpers';

const mapStateToProps = ({ user, favorites }) => ({
  loading: user.loading,
  user: isEmpty(getUser()) ? user.user : getUser(),
  isLoggedIn: user.isLoggedIn || isAuthenticated(),
  hasFavorites: !isEmpty(favorites.favorites)
});

export default connect(mapStateToProps, {
  logout,
  fetchFavorites
})(Navbar);
