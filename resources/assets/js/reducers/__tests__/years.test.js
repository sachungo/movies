import actionTypes from '../../moviesConstants';
import reducer from '../years';

describe('YEARS reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      years: []
    };
  });

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_YEARS_RANGE', () => {
    expect(reducer(initialState, {
      type: actionTypes.GET_YEARS_RANGE,
      years: [2018, 2017, 2010]
    })).toEqual({
      years: [2018, 2017, 2010]
    });
  });
});
