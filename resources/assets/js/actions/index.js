import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { deriveApiPage, getAxiosErrorMessage } from '../helpers';

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

        if (!isEmpty(data.errors)) {
          const message = data.errors.status_message || 'An error occured!';
          return dispatch(fetchingMoviesError(message));
        }

        const isFiltered = !!filterQuery;
        if (isEmpty(data.results)) {
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

        const errorMessage = getAxiosErrorMessage(error);
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

export const setPaginatorPage = (page, reset = false) => ({
  type: actionTypes.SET_ACTIVE_PAGE,
  page,
  reset
});

const empty = isFiltered => ({
  type: actionTypes.EMPTY_RESPONSE,
  isFiltered
});

export const reset = () => ({
  type: actionTypes.RESET_MOVIES
});
