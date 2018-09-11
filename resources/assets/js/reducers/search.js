import actionTypes from '../moviesConstants';

const initialState = {
  loading: false,
  results: [],
  empty: '',
  value: '',
  error: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_SEARCH_RESULTS:
      return {
        ...state,
        loading: action.loading,
        error: ''
      }
    case actionTypes.SEARCH_FETCHING_SUCCESS:
      return {
        ...state,
        results: action.payload,
        empty: ''
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
        value: action.payload,
        results: [],
        empty: '',
        error: ''
      }
    case actionTypes.SEARCH_RESET:
      return {
        ...state,
        ...initialState
      }
    case actionTypes.SEARCH_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default search;
