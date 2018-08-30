import actionTypes from '../moviesConstants';

export const setSelectedOption = (payload, criterion = 'actors') => ({
  type: actionTypes.FILTER_CRITERIA_OPTION_CHANGED,
  payload,
  criterion
});
