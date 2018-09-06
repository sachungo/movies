import actionTypes from '../moviesConstants';

const initialState = {
  years: []
};

const years = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_YEARS_RANGE:
      return {
        ...state,
        years: action.years
      };
    default:
      return state;
  }
};

export default years;
