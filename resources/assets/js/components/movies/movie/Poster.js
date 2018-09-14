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

  const image500Width = `${IMAGE_BASE_URL}/w500${posterPath}`;
  const image342Width = `${IMAGE_BASE_URL}/w342${posterPath}`;
  return (
    <Image
      src={`${IMAGE_BASE_URL}/w154${posterPath}`}
      srcSet={`${image342Width} 342w, ${image500Width} 500w`}
      sizes="(max-width: 320px) 95vw, (max-width: 480px) 95vw, 154px"
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
