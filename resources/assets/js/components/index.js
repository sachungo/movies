
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from '../reducers';
import Movies from './Movies';

// TODO: to be removed after hooking up things, currently it will break tests
import Example from './Example';

if (document.getElementById('movies-app')) {
  render(
    <Provider store={store}>
      <Movies />
    </Provider>,
    document.getElementById('movies-app')
  )
}
