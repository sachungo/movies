import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import colors from './colors';

const Container = styled.div`
  max-width: ${rem('400px')};
  text-align: center;
  margin: ${rem('20px')} auto;
`;

const Image = styled.img``;

const Header = styled.h2`
  color: ${colors.notFound};

  ${({ isError }) => isError && css`
    color: ${colors.error};
  `}

  font-weight: 500;
  font-size: ${rem('20px')};
`;

const Text = styled.p`
  margin-top: ${rem('10px')};
  font-size: ${rem('16px')};
`;

const Message = ({ type, header, description }) => {
  const url = type === 'empty' ? '/images/empty.svg' : '/images/error.svg';
  return (
    <Container>
      <Header isError={type !== 'empty'}>{header}</Header>
      <Image src={url} alt={`${type}-icon`} />
      <Text>{description}</Text>
    </Container>
  )
};

Message.defaultProps = {
  type:'empty',
  header: 'Nothing here!',
  description: 'Sorry, no movies found! Try filtering by actor, genre and year, or searching by the movie\'s name.'
};

Message.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string,
  description: PropTypes.string
};

export default Message;
