import actionTypes from '../moviesConstants';

const initialState = {
  favorites: [],
  loading: false,
  error: ''
};

const deleteByFavoriteId = (favorites, payload) => (
  favorites.filter(
    favorite => favorite.favorite_id !== +payload.favorite_id
  )
);

const deleteByMovieId = (favorites, payload) => (
  favorites.filter(
    favorite => favorite.id !== +payload.id
  )
);

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FAVORITES_LOADING:
      return {
        ...state,
        loading: action.loading,
        error: ''
      };
    case actionTypes.FAVORITES_ERROR:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload
      };
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [
          ...state.favorites,
          action.payload
        ]
      };
    case actionTypes.DELETE_FAVORITE:
      return {
        ...state,
        favorites: deleteByFavoriteId(state.favorites, action.payload)
      };
    case actionTypes.DELETE_FAVORITE_MOVIE_ID:
      return {
        ...state,
        favorites: deleteByMovieId(state.favorites, action.payload)
      };
    default:
      return state;
  }
}
