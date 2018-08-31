import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { fetchActors } from '../actors';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Actors actions test', () => {
  const actorsSuccess = (data = { results: [] }) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  );

  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches LOADING_ACTORS when fetching actors', async () => {
    actorsSuccess();
    await store.dispatch(fetchActors());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_ACTORS,
      loading: true
    });
  });

  it('dispatches FETCH_ACTORS_SUCCESS when the actors have been fetched', async () => {
    actorsSuccess();
    await store.dispatch(fetchActors());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.FETCH_ACTORS_SUCCESS,
      payload: []
    });
  });
});
