import { connect } from 'react-redux';

import Dashboard from './Dashboard';

const mapStateToProps = () => ({
  favorites: [],
  hasFavorites: false
});

export default connect(mapStateToProps)(Dashboard);
