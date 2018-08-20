import axios from 'axios';
import _ from 'lodash';
import actionTypes from '../moviesConstants';

export const fetchMovies = (page = 1) => {
  return dispatch => {
    dispatch(loadingMovies(true));

    return axios.get(`/api/movies?page=${page}`)
      .then(response => {
        dispatch(loadingMovies(false));

        const { data } = response;
        if (_.isObject(data)) {
          dispatch(fetchingMoviesSuccess({
            page: data.page + 1,
            movies: data.results
          }));
        }
      })
      .catch(error => {
        dispatch(loadingMovies(false));

        const errorMessage = getErrorMessage(error);
        dispatch(fetchingMoviesError(errorMessage));
      })
  }
};

const loadingMovies = loading => ({
  type: actionTypes.LOADING_ALL_MOVIES,
  loading
});

const fetchingMoviesSuccess = payload => ({
  type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
  payload
});

const fetchingMoviesError = errorMessage => ({
  type: actionTypes.FETCH_ALL_MOVIES_ERROR,
  payload: errorMessage
});

const getErrorMessage = error => {
  const defaultMessage = 'Unknown error occurred. Please try again after a few minutes';
  if (error.response) {
    return error.response.data;
  }
  if (error.request) {
    return error.request;
  }
  if (error.message) {
    return error.message;
  }

  return defaultMessage;
}
