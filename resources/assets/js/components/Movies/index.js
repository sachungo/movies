import { connect } from 'react-redux';

import Presenter from './Presenter';

import { fetchMovies } from '../../actions';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page))
});

const App = connect(mapStateToProps, mapDispatchToProps)(Presenter);

export default App;
