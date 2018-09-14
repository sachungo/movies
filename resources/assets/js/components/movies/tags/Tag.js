import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../shared';

const Wrapper = styled.div`
  padding-left: ${rem('15px')};
  border: ${rem('1px')} solid ${colors.primary};
  border-radius: ${rem('25px')};
  color: ${colors.primary};
  font-weight: 400;
  font-size: ${rem('15px')};
  margin-right: ${rem('10px')};
  margin-top: ${rem('10px')};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  margin-left: ${rem('10px')};
  padding: ${rem('5px')};
  cursor: pointer;

  svg {
    font-size: 22px;
  }
`;

export default class Tag extends PureComponent {
  static propTypes = {
    tag: PropTypes.object,
    onClick: PropTypes.func
  };

  handleClick = () => {
    this.props.onClick(
      this.props.tag
    );
  }

  render() {
    const { tag } = this.props;
    return (
      <Wrapper data-test="individual-tag">
        {tag.name}
        <Icon onClick={this.handleClick} data-test="tag-icon">
          <FontAwesomeIcon icon="times-circle" />
        </Icon>
      </Wrapper>
    );
  }
}
