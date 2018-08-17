import actionTypes from '../moviesConstants';

const loadingMovies = loading => ({
  type: actionTypes.LOADING_ALL_MOVIES,
  loading
});

export const fetchMovies = (page = 1) => {
  return dispatch => {
    dispatch(loadingMovies(true));

    return axios.get(`/api/movies?${page}`)
      .then(response => {
        console.log('response', response);
        dispatch(loadingMovies(false));
        // dispatch response: FETCH_ALL_MOVIES_SUCCESS
      })
      .catch(error => {
        console.log('error: ', error);
        dispatch(loadingMovies(false));
        // dispatch error: FETCH_ALL_MOVIES_ERROR
      })
  }
};
