import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoviesLists from './presenters';
import { Loader } from '../shared';

const Container = styled.div``;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default class MoviesWrapper extends Component {
  componentDidMount() {
    const { fetchAll, nextPage } = this.props;
    this.props.fetchAll(nextPage);
  }

  render() {
    const { loading } = this.props;
    if(loading) {
      return (
        <LoaderWrapper>
          <Loader
            height={80}
            width={80}
            primaryColor="#00ced1"
            secondaryColor="rgba(0, 206, 209, 0.1)"
          />
        </LoaderWrapper>
      );
    }

    return (
      <Container>
        <MoviesLists />
      </Container>
    );
  }
}

MoviesWrapper.propTypes = {
  nextPage: PropTypes.number,
  fetchAll: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
