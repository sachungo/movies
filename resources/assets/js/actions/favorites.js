import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

const loadingFavorites = loading => ({
  type: actionTypes.FAVORITES_LOADING,
  loading
});

const setErrors = error => ({
  type: actionTypes.FAVORITES_ERROR,
  error
});

const successAction = (payload, actionType) => ({
  type: actionTypes[actionType],
  payload
});

export const fetchFavorites = () => {
  return dispatch => {
    dispatch(loadingFavorites(true));
    return axios.get('/api/favorites')
      .then(response => {
        console.log('Favorites response: ', response);
        dispatch(loadingFavorites(false));

        const { data = {} } = response;
        dispatch(successAction(data, 'FAVORITES_SUCCESS'));
      })
      .catch(error => {
        console.log('Favorites Error: ', error);
        dispatch(loadingFavorites(false));

        const errorMessage = getAxiosErrorMessage(error);
        dispatch(setErrors(errorMessage));
      });
  }
};

export const addFavorite = (data = {}) => {
  return dispatch => {
    return axios.post('/api/favorites', data)
      .then(response => {
        console.log('Add favorite response: ', response);
        dispatch(successAction(response.data, 'ADD_FAVORITE'));
      })
      .catch(error => {
        console.log('Add favorite error: ', error);
        const errorMessage = getAxiosErrorMessage(error);
        dispatch(setErrors(errorMessage));
      });
  }
};

export const deleteFavorite = (id) => {
  if (!id) {
    return setErrors('Invalid movie id! It must be a whole number.');
  }

  return axios.delete(`/api/favorites/${id}`)
    .then(response => {
      console.log('Delete response: ', response);
      dispatch(successAction(response.data, 'DELETE_FAVORITE'));
    })
    .catch(error => {
      console.log('Delete Error: ', error);
      const errorMessage = getAxiosErrorMessage(error);
      dispatch(setErrors(errorMessage));
    });
};
