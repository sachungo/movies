import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem, ellipsis } from 'polished';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { media, colors } from '../../shared';
import { checkIfObjectExistInArray } from '../../../helpers';
import MovieCard from './Card';

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${rem('15px')} 0;

  ${media.medium`
    justify-content: flex-start;
  `}
`;

const MoviesList = ({
  movies,
  addFavorite,
  favorites,
  deleteByMovieId
}) => (
  <MoviesContainer>
    {movies.map(movie => {
      const placeholder = `${movie.title} poster`;
      const isTracked = checkIfObjectExistInArray(movie, favorites);
      return (
        <MovieCard
          key={movie.id}
          movie={movie}
          placeholder={placeholder}
          addFavorite={addFavorite}
          isAlreadyLiked={isTracked}
          deleteByMovieId={deleteByMovieId}
          data-test="single-movie"
        />
      )
    })}
  </MoviesContainer>
);
export default MoviesList;
