import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage, history } from '../helpers';
import setAuthorizationHeader from '../helpers/axios';

const setUser = (payload = {}) => ({
  type: actionTypes.USER_SUCCESS,
  payload
});

const loadingUser = loading => ({
  type: actionTypes.USER_LOADING,
  loading
});

const loggedIn = isLoggedIn => ({
  type: actionTypes.USER_LOGGEDIN,
  isLoggedIn
});

const handleResponse = (response, dispatch) => {
  console.log('Response: ', response);
  if (response.status !== 200) {
    logout();
  }

  dispatch(loadingUser(false));

  const { results = {} } = response.data;
  dispatch(setUser(results));
  if (!isEmpty(results)) {
    const user = {
      name: results.name,
      id: results.id
    };
    localStorage.setItem('token', results.access_token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  setAuthorizationHeader();
  dispatch(loggedIn(true));
  history.push('/home');
}

export const login = (payload = {}) => {
  return dispatch => {
    dispatch(loadingUser(true));
    axios.post('/api/login', payload)
      .then(response => handleResponse(response, dispatch))
      .catch((error) => {
        dispatch(loadingUser(false));
        console.log('error =>', error);
        // TODO: handle login error
      });
  }
}

export const register = (payload = {}) => {
  return dispatch => {
    console.log('payload', payload);
    dispatch(loadingUser(true));
    axios.post('/api/register', payload)
      .then(response => handleResponse(response, dispatch))
      .catch((error) => {
        dispatch(loadingUser(false));
        console.log('error =>', error);
        // TODO: handle register error
      });
  }
}

export const logout = () => {
  return dispatch => {
    axios.get('/api/logout')
      .then(() => {
        dispatch(setUser());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(loggedIn(false));
        history.push('/');
      })
      .catch((error) => {
        console.log('error =>', error);
        // TODO: handle logout error
      });
  }
}
