import axios from 'axios';
import actionTypes from '../moviesConstants';

const loadingMovies = loading => ({
  type: actionTypes.LOADING_ALL_MOVIES,
  loading
});

const fetchingMoviesSuccess = payload => ({
  type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
  payload
});

export const fetchMovies = (page = 1) => {
  return dispatch => {
    dispatch(loadingMovies(true));

    return axios.get(`/api/movies?page=${page}`)
      .then(response => {
        dispatch(loadingMovies(false));
        dispatch(fetchingMoviesSuccess({
          page: response.data.page + 1,
          movies: response.data.results
        }));
      })
      .catch(error => {
        /**
         * {
         *   status_code: 34,
         *   status_message: '...',
         *   success: false
         * }
         */
        dispatch(loadingMovies(false));

        // TODO: correctly get the error message from Axios
      })
  }
};
