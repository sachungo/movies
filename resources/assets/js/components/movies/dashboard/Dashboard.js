import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import { StatusMessage, colors } from '../../shared';

const Container = styled.div``;

export default class Dashboard extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    hasFavorites: PropTypes.bool
  };

  render() {
    const { hasFavorites } = this.props;
    return (
      <Container>
        {!hasFavorites && (
          <StatusMessage
            type="empty"
            description="You have no favorite movies. Visit the homepage and click the heart icon to update the favorite list"
            data-test="favorites-empty-state"
          />
        )}
      </Container>
    )
  }
}
