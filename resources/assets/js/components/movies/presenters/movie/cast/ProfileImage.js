import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors, Loader, styles } from '../../../../shared';

const Image  = styled.img`
  flex: 0 0 ${rem('50px')};
  height: ${rem('50px')};
  border-radius: 50%;
  margin-right: ${rem('10px')};
`;

const Initial = Image.withComponent('div');

const Initials = Initial.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${rem('1px')} solid ${colors.primary};
`;

export default class ProfileImage extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    profilePath: PropTypes.string
  };

  getInitials(name) {
    if(!name) {
      return '';
    }

    return name.split(/\s/g).reduce((initials, name) =>
      initials += name.charAt(0).toUpperCase(), '');
  }

  render() {
    const { name, profilePath } = this.props;
    if (!profilePath) {
      const initials = this.getInitials(name);
      return (
        <Initials data-test="profile-initials">
          {initials}
        </Initials>
      );
    }

    return (
      <Image
        src={`https://image.tmdb.org/t/p/w45${profilePath}`}
        alt={`${name}-profile-picture`}
        data-test="profile-picture"
      />
    );
  }
}
