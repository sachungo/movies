import actionTypes from '../moviesConstants';

const initialState = {
  movies: [],
  page: 1,
  loading: false,
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
      return {
        ...state,
        movies: [...state.movies, ...action.payload]
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
