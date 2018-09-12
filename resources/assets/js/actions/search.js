import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

export const fetchSearchMovies = (query = '') => {
  return dispatch => {
    dispatch(loadingResults(true));

    const queryString = query ? encodeURI(query) : '';
    return axios.get(`/api/search?query=${queryString}`)
      .then(response => {
        dispatch(loadingResults(false));

        const { results = [], errors = [] } = response.data;
        if (!isEmpty(errors)) {
          const message = errors.status_message || 'An error occured!';
          return dispatch(searchError(message));
        }

        if (isEmpty(results)) {
          return dispatch(emptySearch());
        }

        dispatch(searchSuccess(results))
      })
      .catch(error => {
        dispatch(loadingResults(false));

        const errorMessage = getAxiosErrorMessage(error);
        dispatch(searchError(errorMessage));
      });
  }
};

const loadingResults = loading => ({
  type: actionTypes.LOADING_SEARCH_RESULTS,
  loading
});

const searchSuccess = payload => ({
  type: actionTypes.SEARCH_FETCHING_SUCCESS,
  payload
});

const searchError = payload => ({
  type: actionTypes.SEARCH_FETCHING_ERROR,
  payload
});

const emptySearch = () => ({
  type: actionTypes.SEARCH_RESULTS_EMPTY
});

export const reset = () => ({
  type: actionTypes.SEARCH_RESET
});

export const setValue = payload => ({
  type: actionTypes.SEARCH_VALUE_CHANGED,
  payload
});
