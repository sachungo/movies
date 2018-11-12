import React, { Component } from 'react';
import proptypes from 'prop-types';

export default class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Movies</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="/login">Login</a>
            <a class="nav-item nav-link" href="/register">Register</a>
          </div>
        </div>
      </nav>
    )
  }
}
