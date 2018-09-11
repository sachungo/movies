import actionTypes from '../moviesConstants';

const initialState = {
  data: {},
  loading: false,
  hasInfo: false,
  cast: [],
  loadingCast: false,
  error: '',
  hasCastError: false
};

const movie = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_MOVIE_INFO:
      return {
        ...state,
        data: action.payload,
        hasInfo: true,
        error: ''
      }
    case actionTypes.LOADING_MOVIE_INFO:
      return {
        ...state,
        loading: action.loading,
        error: ''
      }
    case actionTypes.ADD_MOVIE_CAST:
      return {
        ...state,
        cast: action.cast
      }
    case actionTypes.LOADING_MOVIE_CAST:
      return {
        ...state,
        loadingCast: action.loading,
        hasCastError: false
      }
    case actionTypes.FETCH_MOVIE_INFO_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.FETCH_MOVIE_CAST:
      return {
        ...state,
        hasCastError: true
      }
    default:
      return state;
  }
};

export default movie;
