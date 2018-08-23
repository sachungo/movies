import axios from 'axios';
import actionTypes from '../moviesConstants';

export const fetchGenres = () => {
  return dispatch => {
    dispatch(loadingGenres(true));

    return axios.get('/api/genres')
      .then(response => {
        dispatch(loadingGenres(false));

        const { genres = []} = response.data;
        dispatch(fetchingGenresSuccess(genres))
      })
      .catch(error => {
        dispatch(loadingGenres(false));
        // TODO: handle error
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
