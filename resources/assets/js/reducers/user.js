import actionTypes from '../moviesConstants';

const initialState = {
  user: {},
  loading: false,
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.USER_LOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    default:
      return state;
  }
};
