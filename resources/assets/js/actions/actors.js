import axios from 'axios';
import actionTypes from '../moviesConstants';

export const fetchActors = () => {
  return dispatch => {
    dispatch(loadingActors(true));

    return axios.get('/api/actors')
      .then(response => {
        dispatch(loadingActors(false));

        const { results = [] } = response.data;
        dispatch(fetchingActorsSuccess(results));
      })
      .catch(error => {
        dispatch(loadingActors(false));
        // TODO: handle error
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
