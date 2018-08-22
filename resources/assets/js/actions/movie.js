import actionTypes from '../moviesConstants';

export const loadMovieSuccess = payload => ({
  type: actionTypes.LOAD_MOVIE_SUCCESS,
  payload
});
