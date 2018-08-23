import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';
import actionTypes from '../../moviesConstants';
import { addMovieInfo, fetchMovie } from '../movie';

jest.mock('axios');

const mockStore = configureStore([thunkMiddleware]);

describe('Single movie action test', () => {
  const movieSuccess = (data = { genres: [], title: '', id: 1 }) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  );

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

  it('dispatches LOADING_MOVIE_INFO when fetching movies', async () => {
    movieSuccess();
    await store.dispatch(fetchMovie(123));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.LOADING_MOVIE_INFO,
      loading: true
    });
  });

  it('dispatches ADD_MOVIE_INFO when movie info is successfully fetched', async () => {
    const data = {
      genres: [
        {
          id: 12,
          name: 'Adventure'
        }
      ],
      title: 'Testing fetch movie',
      id: 123
    };
    movieSuccess(data);
    await store.dispatch(fetchMovie(123));
    expect(store.getActions()).toContainEqual({
      type: actionTypes.ADD_MOVIE_INFO,
      payload: data
    });
  });
});
