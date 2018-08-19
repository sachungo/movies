import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';

import { fetchMovies } from '../../actions';

const mapStateToProps = state => ({
  loading: state.loading,
  nextPage: state.nextPage
});

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
