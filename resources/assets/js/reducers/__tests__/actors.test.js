import actionTypes from '../../moviesConstants';
import reducer from '../actors';

describe('Actors reducer test', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      loading: false,
      actors: []
    };
  });

  it('should return the initial state for default actions', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      actors: []
    });
  });

  it('should handle LOADING_ACTORS', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_ACTORS,
      loading: true
    })).toEqual({
      loading: true,
      actors: []
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
      loading: false,
      actors: payload
    });
  });
});
