import actionTypes from '../moviesConstants';

const initialState = {
  actors: new Map()
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_CRITERIA_OPTION_CHANGED:
      const { criterion, payload } = action;

      return {
        ...state,
        [criterion] : state[criterion].set(payload.id, payload.isChecked)
      }
    default:
      return state;
  }
}

export default filters;
