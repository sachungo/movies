import actionTypes from '../moviesConstants';

const initialState = {
  data: {},
  genres: []
};

const movie = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_MOVIE_INFO:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

export default movie;
