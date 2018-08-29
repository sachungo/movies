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

        const { cast = [] } = response.data.credits;
        dispatch(addMovieCastInfo(cast));
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

export const addMovieCastInfo = cast => ({
  type: actionTypes.ADD_MOVIE_CAST,
  cast
});

const loadingCast = loading => ({
  type: actionTypes.LOADING_MOVIE_CAST,
  loading
});

export const fetchMovieCast = movieId => {
  return dispatch => {
    dispatch(loadingCast(true));

    return axios.get(`/api/movie/${movieId}/cast`)
      .then(response => {
        dispatch(loadingCast(false));

        const { cast = [] } = response.data;
        dispatch(addMovieCastInfo(cast));
      })
      .catch(error => {
        dispatch(loadingCast(false));

        // TODO: handle error
      });
  }
};
