import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

import store from '../reducers';
import { Home, MovieInfo } from './movies';
import { fetchGenres } from '../actions/genres';
import { genresSelector } from '../selectors';

class MoviesApp extends Component {
  static propTypes = {
    hasGenres: PropTypes.bool,
    fetchGenres: PropTypes.func.isRequired
  };

	componentDidMount() {
    const { hasGenres, fetchGenres } = this.props;
    if (!hasGenres) {
      fetchGenres();
    }
	}

  render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/movies/:id" component={MovieInfo} />
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = ({ genres }) => ({
  hasGenres: genresSelector(genres)
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres())
});

const ConnectedMoviesApp = connect(mapStateToProps, mapDispatchToProps)(MoviesApp);

const App = () => (
  <Provider store={store}>
    <ConnectedMoviesApp />
  </Provider>
);

export default App;
