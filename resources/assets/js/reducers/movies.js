import actionTypes from '../moviesConstants';
import { paginateData, getPaginatorTotalCount } from '../helpers';

const initialState = {
  movies: {},
  loading: true,
  error: '',
  totalResults: 0,
  activePage: 1,
  isFiltered: false
};

const movies = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOADING_ALL_MOVIES:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
      const { paginatorPage, totalResults, movies, isFiltered } = action.payload;
      return {
        ...state,
        movies: {
          ...state.movies,
          ...paginateData(paginatorPage, movies, totalResults)
        },
        totalResults: getPaginatorTotalCount(totalResults),
        isFiltered
      }
    case actionTypes.FETCH_ALL_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.SET_ACTIVE_PAGE:
        return {
          ...state,
          activePage: action.page
        }
    default:
      return state;
  }
};

export default movies;
