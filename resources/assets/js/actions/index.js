import axios from 'axios';
import _ from 'lodash';
import actionTypes from '../moviesConstants';
import { deriveApiPage } from '../helpers';

export const fetchMovies = (paginatorPage = 1) => {
  const page = deriveApiPage(paginatorPage);
  return dispatch => {
    dispatch(loadingMovies(true));

    return axios.get(`/api/movies?page=${page}`)
      .then(response => {
        dispatch(loadingMovies(false));

        const { data = {} } = response;
        if (!_.isEmpty(data)) {
          dispatch(fetchingMoviesSuccess({
            page: data.page,
            movies: data.results,
            paginatorPage
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
  if (error.response) {
    return error.response.data;
  }
  if (error.request) {
    return error.request;
  }
  if (error.message) {
    return error.message;
  }

  return 'Unknown error occurred. Please try again after a few minutes';
}
