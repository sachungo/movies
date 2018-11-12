import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './Navbar';
import { logout } from '../../../actions/authentication';
import { isAuthenticated, getUser } from '../../../helpers';

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
  user: isEmpty(getUser()) ? user.user : getUser(),
  isLoggedIn: user.isLoggedIn || isAuthenticated()
});

export default connect(mapStateToProps, {
  logout
})(Navbar);
