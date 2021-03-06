import actionTypes from '../../moviesConstants';
import reducer from '../movie';

describe('SINGLE movie reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      data: {},
      loading: false,
      hasInfo: false,
      cast: {},
      loadingCast: false,
      error: '',
      hasCastError: false
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
      ...initialState,
      data: payload,
      hasInfo: true
    })
  });

  it('should handle LOADING_MOVIE_INFO', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_MOVIE_INFO,
      loading: true
    })).toEqual({
      ...initialState,
      loading: true
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
      cast,
      movieId: 123
    })).toEqual({
      ...initialState,
      cast: {
        123: cast
      }
    });
  });

  it('should handle LOADING_MOVIE_CAST', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_MOVIE_CAST,
      loading: true
    })).toEqual({
      ...initialState,
      loadingCast: true
    });
  });
});
