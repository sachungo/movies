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
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import store from '../reducers';
import { Home, MovieInfo } from './movies';
import { fetchGenres } from '../actions/genres';
import { fetchActors } from '../actions/actors';
import getYearsRange from '../actions/years';
import { genresSelector, actorsSelector } from '../selectors';

library.add(faChevronUp, faChevronDown);

class MoviesApp extends Component {
  static propTypes = {
    hasActors: PropTypes.bool,
    hasGenres: PropTypes.bool,
    fetchActors: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    getRangeOfYears: PropTypes.func.isRequired
  };

	componentDidMount() {
    const {
      hasGenres,
      fetchGenres,
      hasActors,
      fetchActors,
      getRangeOfYears
    } = this.props;
    if (!hasGenres) {
      fetchGenres();
    }

    if(!hasActors) {
      fetchActors();
    }

    getRangeOfYears();
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

const mapStateToProps = ({ genres, actors }) => ({
  hasGenres: genresSelector(genres),
  hasActors: actorsSelector(actors)
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: () => dispatch(fetchGenres()),
  fetchActors: () => dispatch(fetchActors()),
  getRangeOfYears: () => dispatch(getYearsRange())
});

const ConnectedMoviesApp = connect(mapStateToProps, mapDispatchToProps)(MoviesApp);

const App = () => (
  <Provider store={store}>
    <ConnectedMoviesApp />
  </Provider>
);

export default App;
