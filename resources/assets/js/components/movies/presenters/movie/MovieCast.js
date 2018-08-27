import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { colors, styles } from '../../../shared';

const CastContainer = styled.div`
  display: flex;
  flex: 0 0 ${rem('270px')};
  align-items: center;
  margin-bottom: ${rem('10px')};
  margin-right: ${rem('15px')};
  padding: ${rem('10px')};
  box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.2);
`;

const ProfileImage  = styled.img`
  flex: 0 0 ${rem('50px')};
  height: ${rem('50px')};
  border-radius: 50%;
  margin-right: ${rem('10px')};
`;

const Info = styled.div`
  flex: 1;
`;

const CastInfo = styles.Text.withComponent('span');

const Label = styled(styles.Label)`
  color: ${colors.text};
  font-size: ${rem('15px')};
  flex-wrap: wrap;
  font-weight: 200;
`;

const Text = styled.span`
  margin-right: ${rem('5px')};
  font-weight: 400;
`;

const Initial = ProfileImage.withComponent('div');

const Intials = Initial.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${rem('1px')} solid ${colors.primary};
`;

const getInitials = name => {
  if (!name) {
    return '';
  }

  return name.split(/\s/g).reduce((result, name) =>
    result += name.charAt(0).toUpperCase(), '');
};

const getProfilePicture = (person) => {
  const {profile_path, name } = person;
  if (!profile_path) {
    const initials = getInitials(name);
    return (
      <Intials data-test="actor-initials">
        {initials}
      </Intials>
    );
  }

  return (
    <ProfileImage
      src={`https://image.tmdb.org/t/p/w45${profile_path}`}
      alt={`${name}-profile-picture`}
      data-test="profile-picture"
    />
  )
}

const MovieCast = ({ cast }) => {
  return (
  <CastContainer>
    {getProfilePicture(cast)}
    <Info data-test="actor-details">
      <Label>
        <Text>Name:</Text>
        {cast.name}
      </Label>
      <Label>
        <Text>Character:</Text>
        {cast.character}
      </Label>
    </Info>
  </CastContainer>
)};

export default MovieCast;
