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
