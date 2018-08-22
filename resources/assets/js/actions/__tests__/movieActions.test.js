import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { loadMovieSuccess } from '../movie';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Single movie action test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches LOAD_MOVIE_SUCCESS', () => {
    const payload = {
      id: 12546,
      title: 'Single movie example'
    };
    store.dispatch(loadMovieSuccess(payload));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOAD_MOVIE_SUCCESS,
      payload
    });
  });
});
