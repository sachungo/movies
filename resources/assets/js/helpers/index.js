import _ from 'lodash';

export const getMovieInfo = (state, props) => {
  const propsData = _.get(props.location, 'state.data', {});
  return  _.isEmpty(state.movie.data) ? propsData : state.movie.data;
}
