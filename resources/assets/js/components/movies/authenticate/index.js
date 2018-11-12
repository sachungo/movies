import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './Navbar';
import {
  logout,
  isAuthenticated,
  getUser
} from '../../../actions/authentication';

const mapStateToProps = ({ user }) => {
  const authenticatedUser = isEmpty(user.user) ? getUser() : user.user;
  return {
    user: authenticatedUser,
    isLoggedIn: isAuthenticated(),
    loading: user.loading
  }
};

export default connect(mapStateToProps, { logout })(Navbar);
