/**
 * This file's content have been copy pasted from
 * https://www.styled-components.com/docs/advanced#media-templates
 * and modified to meet the use case of this project.
 */

import { css } from 'styled-components';

const sizes = {
  big: 768,
  medium: 480,
  small: 320
}

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default media;
