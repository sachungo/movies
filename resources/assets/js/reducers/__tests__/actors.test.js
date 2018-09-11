import actionTypes from '../../moviesConstants';
import reducer from '../actors';

describe('Actors reducer test', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      loading: false,
      actors: [],
      error: ''
    };
  });

  it('should return the initial state for default actions', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_ACTORS', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_ACTORS,
      loading: true
    })).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle FETCH_ACTORS_SUCCESS', () => {
    const payload = [{
      id: 1234,
      name: 'Actor'
    }];
    expect(reducer(initialState, {
      type: actionTypes.FETCH_ACTORS_SUCCESS,
      payload
    })).toEqual({
      ...initialState,
      actors: payload
    });
  });
});
