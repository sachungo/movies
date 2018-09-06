import actionTypes from '../../moviesConstants';
import reducer from '../search';

describe('Search reducer test', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      loading: false,
      results: [],
      empty: '',
      value: ''
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
      ...initialState,
      loading: true
    });
  });

  it('should handle SEARCH_FETCHING_SUCCESS', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_FETCHING_SUCCESS,
      payload: [{ id: 1 }]
    })).toEqual({
      ...initialState,
      results: [{ id: 1}]
    })
  });

  it('should handle SEARCH_RESULTS_EMPTY', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_RESULTS_EMPTY
    })).toEqual({
      ...initialState,
      empty: 'No results found!'
    });
  });

  it('should handle SEARCH_RESET', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_RESET
    })).toEqual(initialState);
  });

  it('should handle SEARCH_VALUE_CHANGED', () => {
    expect(reducer(initialState, {
      type: actionTypes.SEARCH_VALUE_CHANGED,
      payload: 'Test'
    })).toEqual({
      ...initialState,
      value: 'Test'
    });
  });
});
