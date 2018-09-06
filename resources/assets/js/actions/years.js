import actionTypes from '../moviesConstants';
import { getYearsOptions } from '../helpers';

const getYearsRange = () => ({
  type: actionTypes.GET_YEARS_RANGE,
  years: getYearsOptions()
});

export default getYearsRange;
