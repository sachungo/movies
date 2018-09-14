import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import colors from './colors';

const Container = styled.div`
  max-width: ${rem('400px')};
  text-align: center;
  margin: ${rem('20px')} auto;
  padding: 0 ${rem('15px')};
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

const CallToAction = styled(Link)`
  cursor: pointer;
  color: ${colors.primary};
  font-size: ${rem('16px')};
  font-weight: 400;
  text-decoration: none;
  padding:${rem('10px')};
  border:${rem('1px')} solid ${colors.primary};
  border-radius: ${rem('8px')};
  display: inline-block;

  &:hover,
  &:active {
    background-color: ${colors.translucent};
    text-decoration: none;
    color: ${colors.primary};
  }
`;

const Message = ({ type, description, buttonText }) => {
  const url = type === 'empty' ? '/images/empty.svg' : '/images/error.svg';
  const message = statusEnum[type];

  return (
    <Container>
      <Header isError={type !== 'empty'}>{message.header}</Header>
      <Image src={url} alt={`${type}-icon`} />
      <Text>{description || message.description}</Text>

      {buttonText && (
        <CallToAction to="/" role="button">
          {buttonText}
        </CallToAction>
      )}
    </Container>
  )
};

Message.defaultProps = {
  type:'empty',
  description: ''
};

Message.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string
};

const statusEnum = {
  error: {
    header: 'Oops, something went wrong!',
    description: 'Try refreshing the page or check your internet connection.'
  },
  empty: {
    header: 'Nothing here!',
    description: 'Sorry, no movies found! Try filtering by actor, genre and year; or searching by the movie\'s name.'
  }
};

export default Message;
