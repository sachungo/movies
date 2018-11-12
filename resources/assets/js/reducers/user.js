import actionTypes from '../moviesConstants';

const initialState = {
  user: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};
