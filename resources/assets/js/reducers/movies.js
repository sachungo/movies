import actionTypes from '../moviesConstants';
import { paginateData } from '../helpers';

const initialState = {
  movies: {},
  loading: true,
  error: '',
  totalPages: 1
};

const TOTAL_PAGES = 5;

const movies = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOADING_ALL_MOVIES:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
      const { paginatorPage, totalPages } = action.payload;
      return {
        ...state,
        movies: {
          ...state.movies,
          ...paginateData(paginatorPage, action.payload.movies)
        },
        totalPages: totalPages > TOTAL_PAGES ? TOTAL_PAGES : totalPages
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
