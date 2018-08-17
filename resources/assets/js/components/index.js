
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from '../reducers';
import App from './movies';

// TODO: to be removed after hooking up things, currently it will break tests
import Example from './Example';

if (document.getElementById('movies-app')) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('movies-app')
  )
}
