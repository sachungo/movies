import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { fetchGenres } from '../genres';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Genres actions test', () => {
  const genresSuccess = (data = { genres: [] }) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  )

  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches LOADING_ALL_GENRES when beginning to fetch the genres', async () => {
    genresSuccess();
    await store.dispatch(fetchGenres());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_ALL_GENRES,
      loading: true
    });
  });

  it('dispatches FETCH_GENRES_SUCCESS when the genres have been fetched', async () => {
    genresSuccess({ genres: {
      id: 28,
      name: 'Adventure'
    }});
    await store.dispatch(fetchGenres());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.FETCH_GENRES_SUCCESS,
      payload: {
        id: 28,
        name: 'Adventure'
      }
    });
  });

  it('dispatches LOADING_GENRES when the genres fetching process is completed', async () => {
    genresSuccess();
    await store.dispatch(fetchGenres());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_ALL_GENRES,
      loading: false
    });
  });
});
