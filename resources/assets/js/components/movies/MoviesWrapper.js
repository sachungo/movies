import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoviesLists from './presenters';

export default class MoviesWrapper extends Component {
  componentDidMount() {
    const { fetchAll, page } = this.props;
    this.props.fetchAll(page);
  }

  render() {
    return (
      <MoviesLists />
    );
  }
}

MoviesWrapper.propTypes = {
  page: PropTypes.number,
  fetchAll: PropTypes.func.isRequired
};
