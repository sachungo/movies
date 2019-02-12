import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import { CSSTransitionGroup } from 'react-transition-group';

import Navigation from '../Navbar';
import Poster from '../Poster';
import MovieCast from '../cast';
import {
  colors,
  media,
  Loader,
  styles,
  StatusMessage
} from '../../../shared';

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

const getDate = releaseDate => {
  if (!releaseDate) {
    return 'No release date specified';
  }

  const isFuture = isAfter(releaseDate, new Date());
  const date = format(releaseDate, 'ddd, Do MMM YYYY');
  return isFuture ? `${date} (FUTURE RELEASE)` : date;
};

const Info = ({ data, genres, movieId, hasGenres }) => (
  <Movie key="movie-info">
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
          <styles.Text>{getDate(data.release_date)}</styles.Text>
        </styles.Label>

        {hasGenres && (
          <CSSTransitionGroup
            transitionName="movie"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <styles.Label key="movie-genres">
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
          </CSSTransitionGroup>
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
      id={movieId}
    />
  </Movie>
);

Info.propTypes = {
  data: PropTypes.object,
  genres: PropTypes.arrayOf(PropTypes.object),
  movieId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  hasGenres: PropTypes.bool
};


export default Info;
