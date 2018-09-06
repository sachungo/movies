import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { fetchSearchMovies } from '../search';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Search action test', () => {
  const searchSuccess = (data = {}) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  );

  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches LOADING_SEARCH_RESULTS on initiating the search request', async () => {
    searchSuccess();
    await store.dispatch(fetchSearchMovies('testing'));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_SEARCH_RESULTS,
      loading: true
    });
  });

  it('dispatches SEARCH_FETCHING_SUCCESS on completing the get request successfully', async () => {
    const data = {
      results: [{
        id: 1,
        name: 'Search testing'
      }]
    }
    searchSuccess(data);
    await store.dispatch(fetchSearchMovies('testing'));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.SEARCH_FETCHING_SUCCESS,
      payload: data.results
    });
  });

  it('dispatches SEARCH_RESULTS_EMPTY on completing the get request successfully with empty results', async () => {
    searchSuccess();
    await store.dispatch(fetchSearchMovies('testing'));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.SEARCH_RESULTS_EMPTY
    });
  });
});
