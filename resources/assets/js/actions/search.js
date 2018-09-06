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

        dispatch(searchSuccess(results))
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
