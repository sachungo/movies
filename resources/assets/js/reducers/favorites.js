import actionTypes from '../moviesConstants';

const initialState = {
  favorites: [],
  loading: false,
  error: ''
}

const deleteFromStore = (favorites, payload) => (
  favorites.filter(favorite => favorite.id !== payload.id)
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
        favorites: deleteFromStore(state.favorites, action.payload)
      };
    default:
      return state;
  }
}
