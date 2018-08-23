import actionTypes from '../moviesConstants';
import axios from 'axios';

export const addMovieInfo = payload => ({
  type: actionTypes.ADD_MOVIE_INFO,
  payload
});


export const fetchMovie = movieId => {
  return dispatch => {
    dispatch(loadingMovie(true));

    return axios.get(`/api/movie/${movieId}`)
      .then(response => {
        dispatch(loadingMovie(false));
        dispatch(addMovieInfo(response.data));
      })
      .catch(error => {
        dispatch(loadingMovie(false));

        // TODO: handle error
      });
  }
}

const loadingMovie = loading => ({
  type: actionTypes.LOADING_MOVIE_INFO,
  loading
});
