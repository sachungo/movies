import _ from 'lodash';
import getYear from 'date-fns/get_year';
import subYears from 'date-fns/sub_years';
import addYears from 'date-fns/add_years';

const LIMIT = 10;

export const isSameId = (state, props) => {
  const { movie } = state;
  const movieId = movie.hasInfo && movie.data.id
  return movieId === +props.match.params.id;
}

export const getMovieInfo = (state, props) => {
  const isIdSame = isSameId(state, props);
  if (isIdSame) {
    return state.movie.data;
  }

  return _.get(props.location, 'state.data', {});
}

/**
 * themoviedb api results are already paginated with a limit of 20 per page.
 * We don't have control of the limit number, as there is no limit query for
 * any endpoint of https://api.themoviedb.org/3/.
 *
 * However, the paginator renders 10 items per page. Therefore, the ideal
 * limit should be 10.
 *
 * This method derives the correct API page number from the paginator page
 * number.
 *
 * @param {number} paginatorPage
 */
export const deriveApiPage = paginatorPage => {
  const API_LIMIT = 20;
  return Math.ceil((paginatorPage * LIMIT) / API_LIMIT);
}

export const getPaginatorTotalCount = count => {
  const MAX_COUNT = 100;
  if (count > MAX_COUNT) {
    return MAX_COUNT;
  }
  return count;
};

const FILTER_TYPES = {
  actors: 'with_cast',
  genres: 'with_genres',
  years: 'primary_release_year'
};

export const getQuery = selections => {
  const filterTypes = Object.keys(selections);
  let query = '';
  filterTypes.forEach((filterType, index) => {
    const filterSelection = selections[filterType];
    if (!_.isEmpty(filterSelection)) {
      query += `&${getFilterQuery(filterSelection, filterType)}`;
    }
  });
  return query;
};

const getFilterQuery = (selection, filterType) => {
  const query = selection.reduce((query, value, index) => {
    if (index === 0) {
      return query += `${value}`;
    }
    return query += `,${value}`;
  }, '');
  return query ? `${FILTER_TYPES[filterType]}=${query}` : '';
};

export const getTags = state => {
  const { filters } = state;
  const filterTypes = Object.keys(filters);

  let tags = [];
  filterTypes.forEach(type => {
    const availableOptions = state[type][type];
    const selectedOptions = availableOptions.filter(option => filters[type].includes(option.id));
    tags = [
      ...tags,
      ...selectedOptions
    ];
  });

  return tags;
};

const generateYearsRange = () => {
  const today = new Date();
  const startYear = subYears(today, 10);
  const endYear = addYears(today, 1);

  return _.range(getYear(today), getYear(startYear));
};

export const getYearsOptions = () => {
  const rangeofYears = generateYearsRange();
  const options = rangeofYears.map(year => ({
    id: year,
    name: year
  }));

  return options;
};

export const getAxiosErrorMessage = error => {
  if (error.response) {
    return (error.response.data && error.response.data.message);
  }
  if (error.request) {
    return error.request;
  }
  if (error.message) {
    return error.message;
  }

  return 'Unknown error occurred. Please try again after a few minutes';
}
