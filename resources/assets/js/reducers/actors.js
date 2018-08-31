import actionTypes from '../moviesConstants';

const initialState = {
  loading: false,
  actors: []
};

const actors = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ACTORS:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.FETCH_ACTORS_SUCCESS:
      return {
        ...state,
        actors: action.payload.slice(0, 10)
      };
    default:
      return state;
  }
};

export default actors;
