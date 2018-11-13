import React, { Component } from 'react';
import { Link } from "react-router-dom";
import User from './User';

export default class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  }

  componentDidMount() {
    const { isLoggedIn, hasFavorites, fetchFavorites } = this.props;
    if(!hasFavorites && isLoggedIn) {
      fetchFavorites();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.isLoggedIn !== prevProps.isLoggedIn) &&
      this.props.isLoggedIn &&
      !this.props.hasFavorites
    ) {
      this.props.fetchFavorites();
    }
  }

  render() {
    const { isLoggedIn, loading, user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Movies</Link>
        <button
          className="navbar-toggler"
          type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoggedIn && (
            <User
              user={user}
              onLogout={this.handleLogout}
            />
          )}

          {!isLoggedIn && (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>
    )
  }
}
