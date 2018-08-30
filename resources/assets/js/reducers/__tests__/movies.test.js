import actionTypes from '../../moviesConstants';
import reducer from '../movies';

describe('ALL movies reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      movies: {},
      loading: true,
      error: '',
      totalResults: 1,
      activePage: 1
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
      error: '',
      totalResults: 1,
      activePage: 1
    });
  });

  it('should handle FETCH_ALL_MOVIES_SUCCESS', () => {
    const state = {...initialState, loading: false};
    expect(reducer(state, {
      type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
      payload: {
        totalResults: 6,
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
      error: '',
      totalResults: 6,
      activePage: 1
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
      error: 'An error occurred',
      totalResults: 1,
      activePage: 1
    });
  });

  it('should handle SET_ACTIVE_PAGE', () => {
    expect(reducer(initialState, {
      type: actionTypes.SET_ACTIVE_PAGE,
      page: 3
    })).toEqual({
      movies: {},
      loading: true,
      error: '',
      totalResults: 1,
      activePage: 3
    });
  });
});
