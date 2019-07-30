import React from 'react';

const Alert = ({ error }) => (
  <div class="alert alert-danger" role="alert">
    {error}
  </div>
);

export default Alert;
