import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem, ellipsis } from 'polished';
import { Link } from 'react-router-dom';
import { media, colors } from '../../shared';

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${rem('15px')};

  ${media.medium`
    justify-content: flex-start;
  `}
`;

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

const Title = styled.p`
  margin-top: ${rem('10px')};
  margin-bottom: 0;
  padding: 0 ${rem('10px')};
  ${ellipsis('154px')};
  transition: all 0.2s;
  color: ${colors.text};
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

const MoviesList = ({ movies }) => (
  <MoviesContainer>
    {movies.map(movie => {
      const placeholder = `${movie.title} poster`;
      return (
        <Movie
          key={movie.id}
          data-test="single-movie"
          to={{
            pathname: `/movies/${movie.id}`,
            state: { data: movie }
          }}
        >
          {movie.poster_path
            ? <Image src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt={placeholder} />
            : <NoImage aria-label={placeholder}>{placeholder}</NoImage>
          }
          <Title>{movie.title}</Title>
        </Movie>
      )
    })}
  </MoviesContainer>
);

export default MoviesList;
