import actionTypes from '../moviesConstants';

export const setSelectedOption = (payload, criterion = 'actors') => ({
  type: actionTypes.FILTER_CRITERIA_OPTION_CHANGED,
  payload,
  criterion
});

export const reset = criterion => ({
  type: actionTypes.RESET_FILTER,
  criterion
})
