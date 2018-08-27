import actionTypes from '../moviesConstants';

const initialState = {
  data: {},
  loading: false,
  hasInfo: false,
  cast: []
};

const movie = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_MOVIE_INFO:
      return {
        ...state,
        data: action.payload,
        hasInfo: true
      }
    case actionTypes.LOADING_MOVIE_INFO:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.ADD_MOVIE_CAST:
      return {
        ...state,
        cast: action.cast
      }
    default:
      return state;
  }
};

export default movie;
