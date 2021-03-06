import actionTypes from '../../moviesConstants';
import reducer from '../filters';

describe('Filters reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {};
  });

  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FILTER_CRITERIA_OPTION_CHANGED', () => {
    const payload = {
      id: 12,
      isChecked: true
    };
    expect(reducer(initialState, {
      type: actionTypes.FILTER_CRITERIA_OPTION_CHANGED,
      payload,
      criterion: 'actors'
    })).toEqual({
      actors: [12]
    });
  });

  it('should handle RESET_FILTER', () => {
    expect(reducer(initialState, {
      type: actionTypes.RESET_FILTER,
      criterion: 'actors'
    })).toEqual({
      actors: []
    });
  });
});
