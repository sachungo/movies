import axios from 'axios';
import actionTypes from '../moviesConstants';
import { getAxiosErrorMessage } from '../helpers';

// axios.post('/api/login', payload, {
//   headers: {'X-Custom-Header': 'foobar'}
// })

export const login = (payload = {}) => {
  return dispatch => {
    axios.post('/api/login', payload)
      .then(response => console.log('response'))
      .catch(error => console.log(error));
  }
}

export const register = (payload = {}) => {
  return dispatch => {
    axios.post('/api/register', payload)
      .then(response => console.log('response'))
      .catch(error => console.log(error));
  }
}
