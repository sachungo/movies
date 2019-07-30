import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';
import { login, resetError } from '../../../actions/authentication';
import Alert from './Alert';

class Login extends Component {
  static propTypes = {};

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillUnmount() {
    this.props.resetError();
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
    const { error } = this.props;
    return (
      <div className="container">
        {error && (
          <Alert error={error} />
        )}
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

const mapStateToProps = ({ user }) => ({
  error: user.error
});

export default connect(mapStateToProps, {
  login,
  resetError
})(Login);
