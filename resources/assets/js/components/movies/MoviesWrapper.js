import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoviesLists from './presenters';

const Container = styled.div``;

export default class MoviesWrapper extends Component {
  componentDidMount() {
    const { fetchAll, page } = this.props;
    this.props.fetchAll(page);
  }

  render() {
    return (
      <Container>
        <MoviesLists />
      </Container>
    );
  }
}

MoviesWrapper.propTypes = {
  page: PropTypes.number,
  fetchAll: PropTypes.func.isRequired
};
