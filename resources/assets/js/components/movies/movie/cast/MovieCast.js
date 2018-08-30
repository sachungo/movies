import React, { PureComponent, Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { colors, styles, Loader } from '../../../shared';
import Actor from './Actor';

const Wrapper = styled.div`
  &:not(:empty) {
    margin-top: ${rem('20px')};
  }
`;

const Title = styles.Label.withComponent('h2');

const TitleWithBorder = Title.extend`
  border-bottom: ${rem('1px')} solid ${colors.border};
  font-size: ${rem('24px')};
`;

const MovieCastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${rem('20px')};
  justify-content: flex-start;
`;

export default class MovieCast extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    cast: PropTypes.arrayOf(PropTypes.object),
    hasCast: PropTypes.bool,
    fetchCast: PropTypes.func,
    id: PropTypes.string,
    shouldFetchCast: PropTypes.bool,
    resetCast: PropTypes.func
  };

  componentDidMount() {
    const {
      fetchCast,
      id,
      shouldFetchCast,
      resetCast
    } = this.props;

    if(shouldFetchCast) {
      resetCast();
      fetchCast(id);
    }
  }

  render() {
    const { loading, cast, hasCast } = this.props;

    if (loading) {
      return (
        <Wrapper>
          <Loader
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            data-test="movie-cast-loader"
          />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        {hasCast && (
          <Fragment>
            <TitleWithBorder>Cast</TitleWithBorder>
            <MovieCastContainer>
              {cast.map(actor => (
                <Actor
                  key={actor.id}
                  actor={actor}
                  data-test="movie-actor"
                />
              ))}
            </MovieCastContainer>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}