import actionTypes from '../../moviesConstants';
import reducer from '../movie';

describe('SINGLE movie reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      data: {},
      loading: false,
      hasInfo: false,
      cast: []
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_MOVIE_INFO', () => {
    const payload = {
      id: 567890,
      title: 'Testing testing'
    }
    expect(reducer(initialState, {
      type: actionTypes.ADD_MOVIE_INFO,
      payload
    })).toEqual({
      data: payload,
      loading: false,
      hasInfo: true,
      cast: []
    })
  });

  it('should handle LOADING_MOVIE_INFO', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_MOVIE_INFO,
      loading: true
    })).toEqual({
      data: {},
      loading: true,
      hasInfo: false,
      cast: []
    });
  });

  it('should handle ADD_MOVIE_CAST', () => {
    const state = {...initialState, loading: false};
    const cast = [{
      character: 'Ethan Hunt',
      id: 500,
      name: 'Tom Cruise',
      profile_path: '/3oWEuo0e8Nx8JvkqYCDec2iMY6K.jpg'
    }];

    expect(reducer(state, {
      type: actionTypes.ADD_MOVIE_CAST,
      cast
    })).toEqual({
      data: {},
      loading: false,
      hasInfo: false,
      cast
    });
  });
});
