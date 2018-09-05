import { connect } from 'react-redux';
import Search from './Search';

const mapStatToProps = (state) => ({
  loading: false
});

export default connect(mapStatToProps)(Search);
