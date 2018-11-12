import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';

const Container = styled.div``;

export default class Register extends Component {
  static propTypes = {};

  render() {
    const { hasFavorites } = this.props;
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter email" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" name="password" />
          </div>
          <div class="form-group">
            <label htmlFor="confirm_password">Password</label>
            <input type="password" class="form-control" id="confirm_password" placeholder="Confirm Password" name="password_confirmation" />
          </div>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
