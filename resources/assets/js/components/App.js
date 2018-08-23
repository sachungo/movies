import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../reducers';
import { Home, MovieInfo } from './movies';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/:id" component={MovieInfo} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
