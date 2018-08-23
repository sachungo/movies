import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MoviesLists } from './presenters';
import { Loader, styles } from '../shared';

const Container = styled.div``;

export default class MoviesWrapper extends Component {
  componentDidMount() {
    const {
      fetchAll,
      fetchGenres,
      hasGenres,
      hasMovies,
      nextPage
    } = this.props;

    if (!hasMovies) {
      fetchAll(nextPage);
    }

    if (!hasGenres) {
      fetchGenres();
    }
  }

  render() {
    const { loading } = this.props;
    if(loading) {
      return (
        <styles.LoaderWrapper>
          <Loader
            height={80}
            width={80}
            primaryColor="#00ced1"
            secondaryColor="rgba(0, 206, 209, 0.1)"
            data-test="movies-loader"
          />
        </styles.LoaderWrapper>
      );
    }

    return (
      <Container>
        <MoviesLists data-test="movies-list" />
      </Container>
    );
  }
}

MoviesWrapper.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  hasGenres: PropTypes.bool,
  hasMovies: PropTypes.bool,
  nextPage: PropTypes.number,
  loading: PropTypes.bool
};
