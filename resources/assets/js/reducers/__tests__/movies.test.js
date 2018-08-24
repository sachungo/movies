import actionTypes from '../../moviesConstants';
import reducer from '../movies';

describe('ALL movies reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      movies: {},
      loading: true,
      error: ''
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_ALL_MOVIES', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_ALL_MOVIES,
      loading: false
    })).toEqual({
      movies: {},
      loading: false,
      error: ''
    });
  });

  it('should handle FETCH_ALL_MOVIES_SUCCESS', () => {
    const state = {...initialState, loading: false};
    expect(reducer(state, {
      type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
      payload: {
        page: 2,
        movies: [{
          id: 176565,
          title: 'Testing movies'
        }],
        paginatorPage: 3
      }
    })).toEqual({
      movies: {
        'page-3': [{
          id: 176565,
          title: 'Testing movies'
        }],
        'page-4': []
      },
      loading: false,
      error: ''
    });
  });

  it('should handle FETCH_ALL_MOVIES_ERROR', () => {
    const state = {...initialState, loading: false};
    expect(reducer(state, {
      type: actionTypes.FETCH_ALL_MOVIES_ERROR,
      payload: 'An error occurred'
    })).toEqual({
      movies: {},
      loading: false,
      error: 'An error occurred'
    });
  });
});
