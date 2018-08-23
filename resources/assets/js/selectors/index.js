import { createSelector } from 'reselect'
import _ from 'lodash';

export const genresSelector = createSelector(
  state => state.genres,
  genres => !_.isEmpty(genres)
);

export const moviesSelector = createSelector(
  state => state.movies,
  movies => !_.isEmpty(movies)
);

const movieGenres = data =>
  _.isEmpty(data.genre_ids) ? data.genres : data.genres_ids;

const genres = state => state.genres;

export const getGenresSelector = createSelector(
  [movieGenres, genres],
  (genres, allGenres) => {
    // check if array of ids or objects
    // if objects, return early
    // otherwise: get the genres from allGenres that corresponse to the ids
  }
);
