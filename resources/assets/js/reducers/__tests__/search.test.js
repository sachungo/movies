import actionTypes from '../../moviesConstants';
import reducer from '../search';

describe('Search reducer test', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      loading: false,
      results: [],
      empty: ''
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOADING_SEARCH_RESULTS', () => {
    expect(reducer(initialState, {
      type: actionTypes.LOADING_SEARCH_RESULTS,
      loading: true
    })).toEqual({
      loading: true,
      results: [],
      empty: ''
    });
  });

  it('should handle SEARCH_FETCHING_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_FETCHING_SUCCESS,
      payload: [{ id: 1 }]
    })).toEqual({
      loading: false,
      results: [{ id: 1}],
      empty: ''
    })
  });

  it('should handle SEARCH_RESULTS_EMPTY', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_RESULTS_EMPTY
    })).toEqual({
      loading: false,
      results: [],
      empty: 'No results found!'
    });
  });
});
