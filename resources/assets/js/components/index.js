import React from 'react';
import { render } from 'react-dom';
import App from './App';

if (document.getElementById('movies-app')) {
  render(
    <App />,
    document.getElementById('movies-app')
  )
}
