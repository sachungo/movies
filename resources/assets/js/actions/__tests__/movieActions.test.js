import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { addMovieInfo } from '../movie';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Single movie action test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches ADD_MOVIE_INFO', () => {
    const payload = {
      id: 12546,
      title: 'Single movie example'
    };
    store.dispatch(addMovieInfo(payload));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.ADD_MOVIE_INFO,
      payload
    });
  });
});
