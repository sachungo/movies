import actionTypes from '../../moviesConstants';
import reducer from '../genres';

describe('ALL genres reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      genres: [],
      loading: false,
      error: ''
    }
  });

  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_ALL_GENRES', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_ALL_GENRES,
      loading: true
    })).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle FETCH_GENRES_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actionTypes.FETCH_GENRES_SUCCESS,
      payload: [{
        id: 1,
        name: 'Testing'
      }]
    })).toEqual({
      ...initialState,
      genres: [{
        id: 1,
        name: 'Testing'
      }]
    });
  });
});
