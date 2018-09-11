import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

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

        const { data = {} } = response;
        if (!isEmpty(data.errors)) {
          const message = data.errors.status_message || 'An error occured!';
          return dispatch(fetchMovieError(message));
        }

        dispatch(addMovieInfo(data));

        const { cast = [] } = data.credits;
        dispatch(addMovieCastInfo(cast));
      })
      .catch(error => {
        dispatch(loadingMovie(false));

        const errorMessage = getAxiosErrorMessage(error);
        dispatch(fetchMovieError(errorMessage));
      });
  }
}

const fetchMovieError = payload => ({
  type: actionTypes.FETCH_MOVIE_INFO_ERROR,
  payload
});

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

        const { cast = [], errors = [] } = response.data;

        if (!isEmpty(errors)) {
          return dispatch(fetchCastError());
        }

        dispatch(addMovieCastInfo(cast));
      })
      .catch(() => {
        dispatch(loadingCast(false));
        dispatch(fetchCastError());
      });
  }
};

const fetchCastError = () => ({
  type: actionTypes.FETCH_MOVIE_CAST
})
