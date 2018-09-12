import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

export const fetchGenres = () => {
  return dispatch => {
    dispatch(loadingGenres(true));

    return axios.get('/api/genres')
      .then(response => {
        dispatch(loadingGenres(false));

        const { genres = [], errors = []} = response.data;
        if (!isEmpty(errors)) {
          const message = errors.status_message || 'An error occured!';
          return dispatch(fetchGenresError(message));
        }

        dispatch(fetchingGenresSuccess(genres))
      })
      .catch(error => {
        dispatch(loadingGenres(false));

        const errorMessage = getAxiosErrorMessage(error);
        dispatch(fetchGenresError(errorMessage));
      })
  }
};

const loadingGenres = loading => ({
  type: actionTypes.LOADING_ALL_GENRES,
  loading
});

const fetchingGenresSuccess = payload => ({
  type: actionTypes.FETCH_GENRES_SUCCESS,
  payload
});

const fetchGenresError = payload => ({
  type: actionTypes.FETCH_GENRES_ERROR,
  payload
});
