import actionTypes from '../moviesConstants';

const initialState = {
  loading: false,
  results: [],
  empty: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_SEARCH_RESULTS:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.SEARCH_FETCHING_SUCCESS:
      return {
        ...state,
        results: action.payload
      }
    case actionTypes.SEARCH_RESULTS_EMPTY:
      return {
        ...state,
        empty: 'No results found!',
        results: []
      }
    default:
      return state;
  }
};

export default search;
