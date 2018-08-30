import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { fetchMovies } from '../';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('movies actions tests', () => {
  const moviesSuccess = (data = { total_pages: 1, results: [] }) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  );

  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches LOADING_ALL_MOVIES when beginning to fetch movies', async () => {
    moviesSuccess();
    await store.dispatch(fetchMovies());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_ALL_MOVIES,
      loading: true
    });
  });

  it('dispatches LOADING_ALL_MOVIES when the fetch action is done', async () => {
    moviesSuccess();
    await store.dispatch(fetchMovies());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_ALL_MOVIES,
      loading: false
    });
  });

  it('dispatches FETCH_ALL_MOVIES_SUCCESS when the fetching process is completed', async () => {
    moviesSuccess();

    await store.dispatch(fetchMovies());
    expect(store.getActions()).toContainEqual({
      type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
      payload: {
        totalPages: 1,
        movies: [],
        paginatorPage: 1
      }
    });
  });
});
