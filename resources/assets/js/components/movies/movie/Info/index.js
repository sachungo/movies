import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Info from './Info';
import {
  Loader,
  styles,
  StatusMessage,
  colors
} from '../../../shared';

export default class MovieInfo extends PureComponent {
  static propTypes = {
    addInfo: PropTypes.func.isRequired,
    data: PropTypes.object,
    fetchInfo: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object),
    hasGenres: PropTypes.bool,
    loading: PropTypes.bool,
    shouldAddInfo: PropTypes.bool,
    shouldFetchInfo: PropTypes.bool,
    error: PropTypes.string
  };

  componentDidMount() {
    const {
      shouldAddInfo,
      addInfo,
      data,
      match,
      fetchInfo,
      shouldFetchInfo
    } = this.props;

    if (shouldAddInfo) {
      addInfo(data);
    }

    if (shouldFetchInfo) {
      const { id } = match.params;
      fetchInfo(id);
    }
  }

  render() {
    const {
      data,
      genres,
      hasGenres,
      loading,
      match,
      error
    } = this.props;

    return (
      <div>
        {loading && (
          <styles.LoaderWrapper>
            <Loader
              height={70}
              width={70}
              primaryColor={colors.primary}
              secondaryColor={colors.translucent}
              data-test="movie-loader"
            />
          </styles.LoaderWrapper>
        )}

        {(!loading && error) && (
          <StatusMessage
            type="error"
            description={
              `${error} Please go to homepage and filter or search for the movie.`
            }
            buttonText="Back to homepage"
            data-test="movie-status"
          />
        )}

        {(!loading && !error) && (
          <Info
            data={data}
            genres={genres}
            movieId={match.params.id}
            hasGenres={hasGenres}
            data-test="movie-info"
          />
        )}
      </div>
    );
  }
}
