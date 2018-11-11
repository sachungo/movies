import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronUp,
  faChevronDown,
  faSearch,
  faChevronLeft,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

import store from '../reducers';
import { Home, MovieInfo, Dashboard } from './movies';
import { fetchGenres } from '../actions/genres';
import { fetchActors } from '../actions/actors';
import getYearsRange from '../actions/years';
import { genresSelector, actorsSelector } from '../selectors';

library.add(
  faChevronUp,
  faChevronDown,
  faSearch,
  faChevronLeft,
  faTimesCircle
);

class MoviesApp extends Component {
  static propTypes = {
    hasActors: PropTypes.bool,
    hasGenres: PropTypes.bool,
    fetchActors: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    getYears: PropTypes.func.isRequired
  };

	componentDidMount() {
    const {
      hasGenres,
      fetchGenres,
      hasActors,
      fetchActors,
      getYears
    } = this.props;
    if (!hasGenres) {
      fetchGenres();
    }

    if(!hasActors) {
      fetchActors();
    }

    getYears();
	}

  render() {
		return (
			<Router>
				<Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Dashboard} />
          <Route path="/register" component={() => null} />
          <Route path="/login" component={() => null} />
					<Route path="/movies/:id" component={MovieInfo} />
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = ({ genres, actors }) => ({
  hasGenres: genresSelector(genres),
  hasActors: actorsSelector(actors)
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchActors: () => dispatch(fetchActors()),
  getYears: () => dispatch(getYearsRange())
});

const ConnectedMoviesApp = connect(mapStateToProps, mapDispatchToProps)(MoviesApp);

const App = () => (
  <Provider store={store}>
    <ConnectedMoviesApp />
  </Provider>
);

export default App;
