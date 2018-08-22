import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem, ellipsis } from 'polished';
import { media } from '../../../shared';

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${rem('15px')};
`;

const Movie = styled.div`
  flex: 0 0 ${rem('190px')};
  height: ${rem('275px')};
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
  &:hover {
    box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.5);
  }
  &:active {
    box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.7);
  }
  ${media.medium`
    flex: 0 0 ${rem('140px')};
    height: ${rem('225px')};
    margin-right: ${rem('10px')};
  `}
  ${media.small`
    flex: 0 0 ${rem('130px')};
    height: ${rem('200px')};
    margin-right: ${rem('10px')};
  `}
`;

const Title = styled.p`
  margin-top: ${rem('10px')};
  margin-bottom: 0;
  padding: 0 ${rem('10px')};
  ${ellipsis('154px')};
  transition: all 0.2s;
  ${Movie}:hover & {
    color: darkturquoise;
    font-weight: 300;
  }
  ${Movie}:active & {
    color: darkturquoise;
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

const MoviesList = ({ movies }) => (
  <MoviesContainer>
    {movies.map(movie => (
      <Movie key={movie.id} data-test="single-movie">
        <Image src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt={`${movie.title} poster`} />
        <Title>{movie.title}</Title>
      </Movie>
    ))}
  </MoviesContainer>
);

MoviesList.propTypes = {
  movies: PropTypes.array
}

export default MoviesList;