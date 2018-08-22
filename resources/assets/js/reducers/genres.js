import actionTypes from '../moviesConstants';

const initialState = {
  genres: [],
  loading: false
}

const genres = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ALL_GENRES:
      return {
        ...state,
        loading: action.loading
      }
    case actionTypes.FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload
      }
    default:
      return state;
  }
};

export default genres;
