import actionTypes from '../moviesConstants';
import { generateYearsRange } from '../helpers';

const getYearsRange = () => ({
  type: actionTypes.GET_YEARS_RANGE,
  years: generateYearsRange()
});

export default getYearsRange;
