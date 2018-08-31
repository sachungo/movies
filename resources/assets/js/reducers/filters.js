import actionTypes from '../moviesConstants';

const initialState = {};

const removeFromArray = (value, list) => (
  list.filter(item => item !== value)
);

const addToArray = (value, list) => [...list, value];

const filters = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_CRITERIA_OPTION_CHANGED:
      const { criterion, payload } = action;
      const previousSelected = state[criterion] || [];

      return {
        ...state,
        [criterion]: payload.isChecked
          ? addToArray(payload.id, previousSelected)
          : removeFromArray(payload.id, previousSelected)
      };
    case actionTypes.RESET_FILTER:
      return {
        ...state,
        [action.criterion]: []
      }
    default:
      return state;
  }
}

export default filters;
