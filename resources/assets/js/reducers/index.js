import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import movies from './movies';
import movie from './movie';
import genres from './genres';
import filters from './filters';
import actors from './actors';
import years from './years';

const reducers = combineReducers({
  allMovies: movies,
  movie,
  genres,
  filters,
  actors,
  years
});

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
);

export default store;
