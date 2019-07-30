import React from 'react';
import { render } from 'react-dom';
import App from './App';
import axiosConfig from '../helpers/axios';

if (localStorage.getItem('token')) {
  axiosConfig();
}

if (document.getElementById('movies-app')) {
  render(
    <App />,
    document.getElementById('movies-app')
  )
}
