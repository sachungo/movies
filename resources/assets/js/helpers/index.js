import _ from 'lodash';

export const getMovieInfo = (state, props) => {
  const propsData = _.get(props.location, 'state.data', {});
  return  _.isEmpty(state.movie.data) ? propsData : state.movie.data;
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
  const offset = 1;
  const pageMultiplier = 2;

  if (isEven(paginatorPage)) {
    return paginatorPage / pageMultiplier;
  }
  return (paginatorPage + offset) / pageMultiplier;
}

const isEven = number => (number % 2 === 0);

const getPaginatorKey = page => `page-${page}`;

export const paginateData = (paginatorPage, data, chunk = 10) => {
  const offset = 1;
  let firstPage = paginatorPage;
  let secondPage = paginatorPage + offset;
  if (isEven(paginatorPage)) {
    firstPage = paginatorPage - offset;
    secondPage = paginatorPage;
  }

  return {
    [getPaginatorKey(firstPage)]: data.slice(0, chunk),
    [getPaginatorKey(secondPage)]: data.slice(chunk)
  };
};
