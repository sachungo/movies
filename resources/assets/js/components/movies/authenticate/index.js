import { connect } from 'react-redux';

import Navbar from './Navbar';
import {
  logout,
  isAuthenticated
} from '../../../actions/authentication';

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isLoggedIn: isAuthenticated(),
  loading: user.loading
});

export default connect(mapStateToProps, { logout })(Navbar);
