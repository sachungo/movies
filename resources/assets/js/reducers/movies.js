import actionTypes from '../moviesConstants';
import { paginateData, getPaginatorTotalCount } from '../helpers';

const initialState = {
  movies: {},
  loading: true,
  error: '',
  totalResults: 1
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
      const { paginatorPage, totalResults, movies } = action.payload;
      return {
        ...state,
        movies: {
          ...state.movies,
          ...paginateData(paginatorPage, movies, totalResults)
        },
        totalResults: getPaginatorTotalCount(totalResults)
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
