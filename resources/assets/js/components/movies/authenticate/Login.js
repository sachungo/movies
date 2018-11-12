import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';

import { login } from '../../../actions/authentication';

class Login extends Component {
  static propTypes = {};

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value
    });
  }

  handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.login({
      email,
      password,
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email" aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <button className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect(null, { login })(Login);
