import actionTypes from '../moviesConstants';

const initialState = {
  genres: [],
  loading: false,
  error: ''
}

const genres = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ALL_GENRES:
      return {
        ...state,
        loading: action.loading,
        error: ''
      }
    case actionTypes.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload
      }
    case actionTypes.FETCH_GENRES_ERROR:
      return {
        ...state,
        genres: [],
        error: action.payload
      }
    default:
      return state;
  }
};

export default genres;
