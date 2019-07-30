import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { rem, ellipsis } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

import { media, colors } from '../../shared';
import { isAuthenticated } from '../../../helpers';

const Movie = styled(Link)`
  text-decoration: none;
  flex: 0 0 ${rem('190px')};
  height: ${rem('285px')};
  margin: ${rem('10px')} ${rem('20px')} ${rem('10px')} 0;
  text-align: center;
  border-radius: ${rem('8px')};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${rem('10px')};
  transition: box-shadow 0.2s ease-in-out;
  position: relative;

  &:hover {
    box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.5);
    text-decoration: none;
  }

  &:active {
    box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.7);
    text-decoration: none;
  }

  ${media.medium`
    flex: 0 0 ${rem('140px')};
    height: ${rem('235px')};
    margin-right: ${rem('10px')};
  `}
  ${media.small`
    flex: 0 0 ${rem('130px')};
    height: ${rem('210px')};
    margin-right: ${rem('10px')};
  `}
`;

const Image = styled.img`
  border-radius: ${rem('8px')};
  height: ${rem('231px')};
  width: ${rem('154px')};
  ${media.medium`
    height: ${rem('180px')};
    width: ${rem('120px')};
  `}
  ${media.small`
    height: ${rem('160px')};
    width: ${rem('110px')};
  `}
`;

const ImageHolder = Image.withComponent('div');
const NoImage = ImageHolder.extend`
  background-color: ${colors.translucent};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${rem('10px')};
  padding-right: ${rem('10px')};
  font-weight: 400;
`;

const HeartContainer = styled.div`
  cursor: pointer;
  height: ${rem('30px')};
  width: ${rem('30px')};
  position: absolute;
  left: 13%;
  top: 6%;

  svg {
    font-size: ${rem('28px')};
    stroke: ${colors.primary};
    stroke-width: ${rem('25px')};
  }

  svg path {
    fill: ${colors.white};

    &:hover {
      fill: ${colors.primaryHover};
    }

    &:active {
      fill: ${colors.primaryActive};
    }
  }

  ${({ isFavorite }) => isFavorite && css`
    svg {
      stroke: ${colors.white};
    }
    svg path {
      fill: ${colors.primary};
    }
  `}
`;

const Title = styled.p`
  margin-top: ${rem('10px')};
  margin-bottom: 0;
  padding: 0 ${rem('10px')};
  ${ellipsis('154px')};
  transition: all 0.2s;
  color: ${colors.text};
  transition: all 0.2s ease-in-out;

  ${Movie}:hover & {
    color: ${colors.primary};
    font-weight: 300;
  }
  ${Movie}:active & {
    color: ${colors.primary};
    font-weight: 500;
  }
  ${media.medium`
    ${ellipsis('140px')};
  `}
  ${media.small`
    ${ellipsis('130px')};
  `}
`;

class Card extends PureComponent {
  handleDelete = () => {
    const {
      id,
      isFavorite = false,
      favorite_id = null
    } = this.props.movie;

    if (isFavorite) {
      return this.props.deleteByFavoriteId(favorite_id);
    }

    if (this.props.isAlreadyLiked) {
      return this.props.deleteByMovieId(id);
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();

    if (!isAuthenticated()) {
      return this.props.history.push('/login');
    }

    const {
      id,
      title,
      poster_path,
      isFavorite = false
    } = this.props.movie;

    if (isFavorite || this.props.isAlreadyLiked) {
      return this.handleDelete();
    }

    return this.props.addFavorite({
      movie_id: id,
      title: title,
      poster_path: poster_path
    });
  }

  render() {
    const { movie, placeholder,  isAlreadyLiked = false} = this.props;
    const { isFavorite = false } = movie;
    return (
      <Movie
        to={{
          pathname: `/movies/${movie.id}`,
          state: isFavorite? {} : { data: movie }
        }}
      >
        <HeartContainer onClick={this.handleClick} isFavorite={isFavorite || isAlreadyLiked}>
          <FontAwesomeIcon icon="heart" />
        </HeartContainer>

        {movie.poster_path
          ? <Image src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt={placeholder} />
          : <NoImage aria-label={placeholder}>{placeholder}</NoImage>
        }

        <Title>{movie.title}</Title>
      </Movie>
    );
  }
}

export default withRouter(Card);
