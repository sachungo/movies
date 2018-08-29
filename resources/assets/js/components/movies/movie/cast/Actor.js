import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors, styles } from '../../../shared';
import ProfileImage from './ProfileImage';

const ActorContainer = styled.div`
  display: flex;
  flex: 0 0 ${rem('270px')};
  align-items: center;
  margin-bottom: ${rem('10px')};
  margin-right: ${rem('15px')};
  padding: ${rem('10px')};
  box-shadow: 0 ${rem('4px')} ${rem('10px')} 0 rgba(99, 107, 111, 0.2);
`;

const ActorInfo = styled.div`
  flex: 1;
`;

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

const Actor = ({ actor }) => (
  <ActorContainer>
    <ProfileImage
      name={actor.name}
      profilePath={actor.profile_path}
      data-test="actor-profile-image"
    />
    <ActorInfo data-test="actor-details">
      <Label>
        <Text>Name:</Text>
        {actor.name}
      </Label>
      <Label>
        <Text>Character:</Text>
        {actor.character}
      </Label>
    </ActorInfo>
  </ActorContainer>
);

export default Actor;
