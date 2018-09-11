import actionTypes from '../moviesConstants';

const initialState = {
  loading: false,
  actors: [],
  error: ''
};

const actors = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ACTORS:
      return {
        ...state,
        loading: action.loading,
        error: ''
      };
    case actionTypes.FETCH_ACTORS_SUCCESS:
      return {
        ...state,
        actors: action.payload.slice(0, 10)
      };
    case actionTypes.FETCH_ACTORS_ERROR:
      return {
        ...state,
        actors: [],
        error: action.payload
      }
    default:
      return state;
  }
};

export default actors;
