import actionTypes from '../moviesConstants';

const initialState = {
  actors: {}
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_CRITERIA_OPTION_CHANGED:
      const { criterion, payload } = action;
      return {
        ...state,
        [criterion] : {
          ...state[criterion],
          [payload.id]: payload.isChecked
        }
      };
    case actionTypes.RESET_FILTER:
      return {
        ...state,
        [action.criterion]: {}
      }
    default:
      return state;
  }
}

export default filters;