import actionTypes from '../moviesConstants';

const initialState = {
  loading: false,
  results: [],
  empty: '',
  value: ''
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
    case actionTypes.SEARCH_VALUE_CHANGED:
      return {
        ...state,
        value: action.payload
      }
    case actionTypes.SEARCH_RESET:
      return {
        ...state,
        ...initialState
      }
    default:
      return state;
  }
};

export default search;
