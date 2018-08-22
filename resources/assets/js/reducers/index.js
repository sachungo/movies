import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import movies from './movies';

const reducers = combineReducers({
  allMovies: movies
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
