import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

const Container = styled.div``

export default class Dashboard extends Component {
  render() {
    return (
      <Container>
        You are viewing the dashboard!
      </Container>
    )
  }
}
