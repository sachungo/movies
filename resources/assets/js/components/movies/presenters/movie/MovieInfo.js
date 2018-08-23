import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';

import { colors, media, Loader, styles } from '../../../shared';

const Movie = styled.div`
  padding: ${rem('20px')};
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

const Paragraph = styled.p`
  color: ${colors.primary};
  font-weight: 400;
  font-size: ${rem('17px')};
  margin-bottom: ${rem('5px')};
`;

const Span = styled.span`
  color: ${colors.text};
  font-weight: 200;
  font-size: ${rem('15px')};
  margin-left: ${rem('10px')};
`;

const ExtraInfo = styled.div`
  margin-top: ${rem('20px')};
`;

const Title = Paragraph.withComponent('h2');

const TitleWithBorder = Title.extend`
  border-bottom: ${rem('1px')} solid ${colors.border};
  font-size: ${rem('24px')};
`;

const Text = Span.withComponent('p');

const StyledText = Text.extend`
  margin-left: 0;
`;

const Container = styled.div``;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export default class MovieInfo extends PureComponent {
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
    const { data, genres, hasGenres, loading } = this.props;
    if (loading) {
      return (
        <styles.LoaderWrapper>
          <Loader
            height={70}
            width={70}
            primaryColor="#00ced1"
            secondaryColor="rgba(0, 206, 209, 0.1)"
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
              <Paragraph>
                Title:
                <Span>{data.title}</Span>
              </Paragraph>
            )}

            {data.popularity && (
              <Paragraph>
                Popularity:
                <Span>{data.popularity}</Span>
              </Paragraph>
            )}

            {data.release_date && (
              <Paragraph>
                Date of release:
                <Span>{data.release_date}</Span>
              </Paragraph>
            )}

            {hasGenres && (
              <Paragraph>
                Genres:
                {genres.map(genre => (
                  <Span
                    key={genre.id}
                    data-test="movie-genre"
                  >
                    {genre.name}
                  </Span>
              ))}
              </Paragraph>
            )}
          </BasicInfo>
        </Wrapper>

        <ExtraInfo>
          {data.overview  && (
            <Container data-test="movie-overview">
              <TitleWithBorder>Overview</TitleWithBorder>
              <StyledText>{data.overview}</StyledText>
            </Container>
          )}
        </ExtraInfo>

      </Movie>
    );
  }
}

MovieInfo.propTypes = {
  addInfo: PropTypes.func.isRequired,
  data: PropTypes.object,
  fetchInfo: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
  hasGenres: PropTypes.bool,
  loading: PropTypes.bool,
  shouldAddInfo: PropTypes.bool,
  shouldFetchInfo: PropTypes.bool
};
