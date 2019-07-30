import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';
import { register, resetError } from '../../../actions/authentication';
import Alert from './Alert';

class Register extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
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

  handleRegister = (event) => {
    event.preventDefault();
    const { name, email, password, password_confirmation } = this.state;
    this.props.register({
      name,
      email,
      password,
      password_confirmation
    });
  }

  render() {
    const { error } = this.props;
    return (
      <div className="container">
        {error && (
          <Alert error={error} />
        )}
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
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
          <div className="form-group">
            <label htmlFor="confirm_password">Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirm Password"
              name="password_confirmation"
              onChange={this.handleChange}
              value={this.state.password_confirmation}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  error: user.error
});

export default connect(mapStateToProps, {
  register,
  resetError
})(Register);
