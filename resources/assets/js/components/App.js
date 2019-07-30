import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  Router,
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
  faTimesCircle,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

import store from '../reducers';
import {
  Home,
  MovieInfo,
  Dashboard,
  Login,
  Register
} from './movies';
import { fetchGenres } from '../actions/genres';
import { fetchActors } from '../actions/actors';
import getYearsRange from '../actions/years';
import { genresSelector, actorsSelector } from '../selectors';
import Navbar from './movies/authenticate';
import { history, isAuthenticated } from '../helpers';

library.add(
  faChevronUp,
  faChevronDown,
  faSearch,
  faChevronLeft,
  faTimesCircle,
  faHeart
);

const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
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
      <Router history={history}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <DashboardRoute path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/movies/:id" component={MovieInfo} />
            <Redirect from='*' to='/' />
          </Switch>
        </div>
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
