import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './Navbar';
import {
  logout,
  isAuthenticated
} from '../../../actions/authentication';

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLoggedIn: isAuthenticated() && !isEmpty(user.user),
  loading: user.loading
});

export default connect(mapStateToProps, { logout })(Navbar);
