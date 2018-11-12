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
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <Link class="dropdown-item" to="/home">Dashboard</Link>
      <Link
        class="dropdown-item"
        to="#"
        onClick={onLogout}
      >
        Logout
      </Link>
    </div>
  </div>
);

export default User;
