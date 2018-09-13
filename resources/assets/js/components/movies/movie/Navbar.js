import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media, colors } from '../../shared';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${rem('10px')} ${rem('10px')} ${rem('10px')} ${rem('0px')};
  margin-bottom: ${rem('20px')};
  border-bottom: ${rem('2px')} solid ${colors.translucent};
`;

const Icon = styled.div`
  flex: 0 0 ${rem('40px')};
  height: ${rem('40px')};
  width: ${rem('40px')};
  margin-right: ${rem('10px')};
  display: none;
  cursor: pointer;

  svg {
    font-size: ${rem('20px')};

    path {
      fill: #DEDEDE;
    }
  }


  ${media.big`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `}
`;

const LogoWrapper = Icon.withComponent('img');

const Logo = LogoWrapper.extend`
  border-radius: 50%;
  display: block;

  ${media.big`
    display: none;
  `}
`;

const Title = styled.div`
  flex: 1;
  font-size: ${rem('20px')};
  font-weight: 400;
  text-align: center;
  line-height: 1.2;

  &:before {
    content: open-quote;
  }

  &:after {
    content: close-quote;
  }
`;

export class Navbar extends PureComponent {
  static propTypes = {
    header: PropTypes.string
  };

  static defaultProps = {
    header: 'Movie Information'
  }

  handleClick = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <Wrapper>
        <Icon data-test="chevron-icon" onClick={this.handleClick}>
          <FontAwesomeIcon icon="chevron-left" />
        </Icon>
        <Logo
          src="/images/logo.png"
          alt="Movie logo"
          data-test="logo"
          onClick={this.handleClick}
        />
        <Title data-test="navbar-header">{this.props.header}</Title>
      </Wrapper>
    );
  }
}

export default withRouter(Navbar);
