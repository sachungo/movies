import axios from 'axios';
import _ from 'lodash';
import actionTypes from '../moviesConstants';
import { deriveApiPage } from '../helpers';

export const fetchMovies = (paginatorPage = 1, filterQuery = '') => {
  return dispatch => {
    dispatch(loadingMovies(true));

    const page = deriveApiPage(paginatorPage);
    const query = filterQuery
      ? `page=${page}${filterQuery}`
      : `page=${page}`;
    return axios.get(`/api/movies?${query}`)
      .then(response => {
        dispatch(loadingMovies(false));

        const { data = {} } = response;
        const isFiltered = !!filterQuery;
        if (_.isEmpty(data.results)) {
          return dispatch(empty(isFiltered));
        }

        dispatch(fetchingMoviesSuccess({
          movies: data.results,
          totalResults: data.total_results,
          page: data.page,
          isFiltered
        }));
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

export const setPaginatorPage = (page, reset = false) => ({
  type: actionTypes.SET_ACTIVE_PAGE,
  page,
  reset
});

const empty = isFiltered => ({
  type: actionTypes.EMPTY_RESPONSE,
  isFiltered
});
