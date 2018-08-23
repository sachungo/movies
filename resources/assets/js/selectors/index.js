import { createSelector } from 'reselect'
import _ from 'lodash';

import { getMovieInfo } from '../helpers';

export const genresSelector = createSelector(
  state => state.genres,
  genres => !_.isEmpty(genres)
);

export const moviesSelector = createSelector(
  state => state.movies,
  movies => !_.isEmpty(movies)
);

const movieGenresSelector = (state, props) => {
  const data = getMovieInfo(state, props);
  if (_.isEmpty(data)) {
    return [];
  }
  return data.genre_ids || data.genres;
}

const allGenresSelector = state => state.genres.genres;

const isObject = data => {
  const values = data.values();
  return _.isObject(values.next().value);
}

export const getGenresSelector = createSelector(
  [movieGenresSelector, allGenresSelector],
  (genres, allGenres) => {
    if (!genres || !allGenres) {
      return [];
    }

    if (isObject(genres)) {
      return genres;
    }

    const FIRST_ARRAY_INDEX = 0;
    const derivedGenres = genres.map(genre_id => {
      const completeGenre = allGenres.filter(genre => genre.id === genre_id);
      return completeGenre[FIRST_ARRAY_INDEX];
    });

    return derivedGenres;
  }
);
