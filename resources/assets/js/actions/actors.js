import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

export const fetchActors = () => {
  return dispatch => {
    dispatch(loadingActors(true));

    return axios.get('/api/actors')
      .then(response => {
        dispatch(loadingActors(false));

        const { results = [], errors = [] } = response.data;
        if (!isEmpty(errors)) {
          const message = errors.status_message || 'An error occured!';
          return dispatch(fetchingActorsError(message));
        }

        dispatch(fetchingActorsSuccess(results));
      })
      .catch(error => {
        dispatch(loadingActors(false));

        const errorMessage = getAxiosErrorMessage(error);
        dispatch(fetchingActorsError(errorMessage));
      })
  }
};

const loadingActors = loading => ({
  type: actionTypes.LOADING_ACTORS,
  loading
});

const fetchingActorsSuccess = payload => ({
  type: actionTypes.FETCH_ACTORS_SUCCESS,
  payload
});

const fetchingActorsError = payload => ({
  type: actionTypes.FETCH_ACTORS_ERROR,
  payload
});
