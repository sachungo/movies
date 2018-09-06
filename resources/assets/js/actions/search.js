import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';

export const fetchSearchMovies = (query = '') => {
  return dispatch => {
    dispatch(loadingResults(true));

    const queryString = query ? encodeURI(query) : '';
    return axios.get(`/api/search?query=${queryString}`)
      .then(response => {
        dispatch(loadingResults(false));

        const { results = [] } = response.data;
        if (isEmpty(results)) {
          return dispatch(emptySearch());
        }

        const list = getSearchResults(results);
        dispatch(searchSuccess(list))
      })
      .catch(error => {
        dispatch(loadingResults(false));
        // TODO: handle the error successfully
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

const getSearchResults = results => {
  const items = results.reduce((list, result) =>
    [...list, ...result.known_for], []);

  return items;
}