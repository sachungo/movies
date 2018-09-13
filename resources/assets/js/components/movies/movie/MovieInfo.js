import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';

import MovieCast from './cast';
import Poster from './Poster';
import Navigation from './Navbar';
import {
  colors,
  media,
  Loader,
  styles,
  StatusMessage
} from '../../shared';

const Movie = styled.div`
  padding: 0 ${rem('20px')};
  margin: 0 auto ${rem('100px')};
  max-width: ${rem('1185px')};

  ${media.laptop`
    max-width: ${rem('900px')};
  `}

  ${media.big`
    max-width: ${rem('615px')};
  `}

  ${media.medium`
    max-width: none;
  `}
`;

const Wrapper = styled.div`
  display: flex;

  ${media.medium`
    flex-direction: column;
  `}
`;

const BasicInfo = styled.div`
  flex: 1;
  margin-left: ${rem('20px')};
  display: flex;
  flex-direction: column;

  ${media.medium`
    margin-left: 0;
    margin-top: ${rem('20px')};
    flex: auto;
  `}
`;

const ExtraInfo = styled.div`
  &:not(:empty) {
    margin-top: ${rem('20px')};
  }
`;

const Title = styles.Label.withComponent('h2');

const TitleWithBorder = Title.extend`
  border-bottom: ${rem('1px')} solid ${colors.border};
  font-size: ${rem('24px')};
`;

const withSpan = styles.Text.withComponent('span');
const GenreText = withSpan.extend`
  &:not(:last-of-type):after {
      content: ",";
    }
  }
`;

const GenresWrapper = styled.div`
  margin-left: ${rem('10px')};
  display: flex;
  flex-wrap: wrap;
`;

const Text = styled.span`
  margin-right: ${rem('10px')};
`;

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
    cast: PropTypes.arrayOf(PropTypes.object),
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

  getDate(releaseDate) {
    if (!releaseDate) {
      return 'No release date specified';
    }

    const isFuture = isAfter(releaseDate, new Date());
    const date = format(releaseDate, 'ddd, Do MMM YYYY');
    return isFuture ? `${date} (FUTURE RELEASE)` : date;
  }

  render() {
    const {
      data,
      genres,
      hasGenres,
      loading,
      hasCast,
      cast,
      match,
      error
    } = this.props;
    if (loading) {
      return (
        <styles.LoaderWrapper>
          <Loader
            height={70}
            width={70}
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            data-test="movie-loader"
          />
        </styles.LoaderWrapper>
      );
    }

    if(error) {
      const description = `${error} Please go to homepage and filter or search for the movie.`;
      return (
        <StatusMessage
          type="error"
          description={description}
          buttonText="Back to homepage"
        />
      )
    }

    return (
      <Movie>
        <Navigation header={data.title} />
        <Wrapper>
          <Poster
            posterPath={data.poster_path}
            alternativeTitle={`${data.title} movie poster`}
            data-test="movie-image"
          />

          <BasicInfo data-test="movie-basics">
            <styles.Label>
              <Text>Title:</Text>
              <styles.Text>{data.title || 'No title specified'}</styles.Text>
            </styles.Label>

            <styles.Label>
              <Text>Popularity:</Text>
              <styles.Text>{data.popularity || 'No popularity value specified'}</styles.Text>
            </styles.Label>

            <styles.Label>
              <Text>Date of release:</Text>
              <styles.Text>{this.getDate(data.release_date)}</styles.Text>
            </styles.Label>

            {hasGenres && (
              <styles.Label>
                Genres:
                <GenresWrapper>
                  {genres.map(genre => (
                    <GenreText
                      key={genre.id}
                      data-test="movie-genre"
                    >
                      {genre.name}
                    </GenreText>
                ))}
                </GenresWrapper>
              </styles.Label>
            )}
          </BasicInfo>
        </Wrapper>

        <ExtraInfo>
          <div data-test="movie-overview">
            <TitleWithBorder>Overview</TitleWithBorder>
            <styles.Text>{data.overview || 'No movie overview'}</styles.Text>
          </div>
        </ExtraInfo>

        <MovieCast
          data-test="movie-cast"
          id={match.params.id}
        />
      </Movie>
    );
  }
}
