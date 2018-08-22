import { connect } from 'react-redux';

import MoviesWrapper from './MoviesWrapper';

import { fetchMovies } from '../../actions';

const mapStateToProps = ({ allMovies }) => ({
  loading: allMovies.loading,
  nextPage: allMovies.nextPage
});

const mapDispatchToProps = dispatch => ({
  fetchAll: page => dispatch(fetchMovies(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesWrapper);
