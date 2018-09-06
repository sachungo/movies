import actionTypes from '../moviesConstants';
import { paginateData, getPaginatorTotalCount } from '../helpers';

const initialState = {
  movies: {},
  loading: true,
  error: '',
  totalResults: 0,
  activePage: 1,
  isFiltered: false,
  isEmpty: false
};

const movies = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOADING_ALL_MOVIES:
      return {
        ...state,
        loading: action.loading,
        isEmpty: false
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
      const total = action.reset ? 0 : state.totalResults;
      return {
        ...state,
        activePage: action.page,
        totalResults: total
      }
    case actionTypes.EMPTY_RESPONSE:
      return {
        ...state,
        isFiltered: action.isFiltered,
        isEmpty: true
      }
    default:
      return state;
  }
};

export default movies;
