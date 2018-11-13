import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import { StatusMessage, colors, media, Loader, styles } from '../../shared';
import MovieCard from '../lists/Card';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${rem('15px')} 0;

  ${media.medium`
    justify-content: flex-start;
  `}
`;

export default class Dashboard extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    hasFavorites: PropTypes.bool,
    error: PropTypes.string
  };

  componentDidMount() {
    this.props.fetchFavorites();
  }

  render() {
    const { hasFavorites, favorites, error, deleteByFavoriteId, loading } = this.props;
    if (loading) {
      return (
        <styles.LoaderWrapper>
          <Loader
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            height={70}
            width={70}
          />
        </styles.LoaderWrapper>
      );
    }

    return (
      <Container>
        {!hasFavorites && (
          <StatusMessage
            type={error ? 'error' : 'empty'}
            description={error
              ? error
              : 'You have no favorite movies. Visit the homepage and click the heart icon to update the favorite list'
            }
            data-test="favorites-empty-state"
          />
        )}

        {favorites.map(favorite => (
          <MovieCard
            key={favorite.id}
            movie={favorite}
            placeholder={`${favorite.title} poster`}
            deleteByFavoriteId={deleteByFavoriteId}
            data-test="single-movie"
          />
        ))}
      </Container>
    )
  }
}
