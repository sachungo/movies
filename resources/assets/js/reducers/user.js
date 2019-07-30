import actionTypes from '../moviesConstants';

const initialState = {
  user: {},
  loading: false,
  isLoggedIn: false,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state,
        loading: action.loading,
        error: ''
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: ''
      };
    case actionTypes.USER_LOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case actionTypes.USER_ERROR:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.USER_ERROR_RESET:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
};
