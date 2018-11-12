import React, { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const User = ({ user, onLogout }) => (
  <div className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {user.name}
    </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <Link className="dropdown-item" to="/home">Dashboard</Link>
      <Link
        className="dropdown-item"
        to="#"
        onClick={onLogout}
      >
        Logout
      </Link>
    </div>
  </div>
);

export default User;
