import actionTypes from '../moviesConstants';

const initialState = {
  movies: {},
  loading: true,
  error: ''
};

const movies = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOADING_ALL_MOVIES:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
      const { page } = action.payload;
      return {
        ...state,
        movies: {
          ...state.movies,
          [`page-${page}`]: action.payload.movies
        }
      }
    case actionTypes.FETCH_ALL_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default movies;
