import actionTypes from '../moviesConstants';

const initialState = {};

const removeFromArray = (value, list) => (
  list.filter(item => item !== value)
);

const addToArray = (value, list, criterion) => {
  if (criterion === 'years') {
    return [value];
  }
  return [...list, value];
};

const handleReset = (state, action) => {
  if (!action.criterion) {
    return initialState;
  }

  return {
    ...state,
    [action.criterion]: []
  };
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_CRITERIA_OPTION_CHANGED:
      const { criterion, payload } = action;
      const previousSelected = state[criterion] || [];

      return {
        ...state,
        [criterion]: payload.isChecked
          ? addToArray(payload.id, previousSelected, criterion)
          : removeFromArray(payload.id, previousSelected)
      };
    case actionTypes.RESET_FILTER:
      return handleReset(state, action);
    default:
      return state;
  }
}

export default filters;
