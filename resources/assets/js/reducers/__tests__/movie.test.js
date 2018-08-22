import actionTypes from '../../moviesConstants';
import reducer from '../movie';

describe('SINGLE movie reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      data: {},
      loading: false
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
      loading: false
    })
  });
});
