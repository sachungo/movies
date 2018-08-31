import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import MovieCast from './cast';
import { colors, media, Loader, styles } from '../../shared';

const Movie = styled.div`
  padding: ${rem('20px')};
  margin: ${rem('50px')} auto ${rem('100px')};
`;

const Image = styled.img`
  border-radius: ${rem('8px')};
  flex: 0 0 ${rem('154px')};
  height: ${rem('200px')};

  ${media.medium`
    flex: 0 0 200px;
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

const GenreText = styles.Text.withComponent('span');

const GenresWrapper = styled.div`
  margin-left: ${rem('10px')};
  display: flex;
  flex-wrap: wrap;
`;

const Text = styled.span`
  margin-right: ${rem('10px')};
`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

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
      hasCast,
      cast,
      match,
      shouldAddInfo
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

    return (
      <Movie>
        <Wrapper>
          {data.poster_path && (
            <Image
              src={`${IMAGE_BASE_URL}/w154${data.poster_path}`}
              srcset={
                `
                  ${IMAGE_BASE_URL}/w500${data.poster_path} 500w,
                  ${IMAGE_BASE_URL}/w342${data.poster_path} 342w,
                `
              }
              sizes="
                (max-width: 320px) 95vw,
                (max-width: 480px) 95vw,
                154px
              "
              alt={`${data.title} movie poster`}
              data-test="movie-image"
            />
          )}

          <BasicInfo data-test="movie-basics">
            {data.title && (
              <styles.Label>
                <Text>Title:</Text>
                <styles.Text>{data.title}</styles.Text>
              </styles.Label>
            )}

            {data.popularity && (
              <styles.Label>
                <Text>Popularity:</Text>
                <styles.Text>{data.popularity}</styles.Text>
              </styles.Label>
            )}

            {data.release_date && (
              <styles.Label>
                <Text>Date of release:</Text>
                <styles.Text>{data.release_date}</styles.Text>
              </styles.Label>
            )}

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
          {data.overview  && (
            <div data-test="movie-overview">
              <TitleWithBorder>Overview</TitleWithBorder>
              <styles.Text>{data.overview}</styles.Text>
            </div>
          )}
        </ExtraInfo>

        <MovieCast
          data-test="movie-cast"
          id={match.params.id}
          shouldFetchCast={shouldAddInfo}
        />
      </Movie>
    );
  }
}
