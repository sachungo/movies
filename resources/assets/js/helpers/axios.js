import axios from 'axios';

export default () => {
  axios.interceptors.request.use(config => {
    const access_token = localStorage.getItem('token');
    config.headers.common.Authorization = `Bearer ${access_token}`;

    return config;
  });
}
