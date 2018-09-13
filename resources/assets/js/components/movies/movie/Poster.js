import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { colors, media } from '../../shared';

const Image = styled.img`
  border-radius: ${rem('8px')};
  flex: 0 0 ${rem('154px')};
  height: ${rem('200px')};

  ${media.medium`
    flex: 0 0 200px;
  `}
`;

const ImagePlaceholder = Image.withComponent('div');
const PlaceHolder = ImagePlaceholder.extend`
  background-color: ${colors.translucent};
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${rem('10px')};
  font-weight: 400;
`;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const Poster = ({ posterPath, alternativeTitle }) => {
  if (!posterPath) {
    return (
      <PlaceHolder
        aria-label={alternativeTitle}
        data-test="poster-placeholder"
      >
        {alternativeTitle}
      </PlaceHolder>
    );
  }

  return (
    <Image
      src={`${IMAGE_BASE_URL}/w154${posterPath}`}
      srcset={
        `
          ${IMAGE_BASE_URL}/w500${posterPath} 500w,
          ${IMAGE_BASE_URL}/w342${posterPath} 342w,
        `
      }
      sizes="
        (max-width: 320px) 95vw,
        (max-width: 480px) 95vw,
        154px
      "
      alt={alternativeTitle}
      data-test="poster"
    />
  );
}

Poster.propTypes = {
  posterPath: PropTypes.string,
  alternativeTitle: PropTypes.string
};

export default Poster;
