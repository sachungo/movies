import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';

export default class Login extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" name="password" />
          </div>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
