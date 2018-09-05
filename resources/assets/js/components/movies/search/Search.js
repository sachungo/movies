import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader, colors } from '../../shared';

const Form = styled.form`
  display: flex;
  margin-bottom: 0;
  width: ${rem('300px')};
  background-color: ${colors.search};
  border-radius: ${rem('8px')};
`;

const Icons = styled.div`
  flex: 0 0 ${rem('30px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = Icons.extend`
  svg path {
    fill: ${colors.white};
  }
`;

const Loading = Icons.extend`
  svg rect {
    fill: transparent;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding:${rem('8px')} ${rem('5px')};
  background: none;

  &::placeholder {
    color: ${colors.white};
  }

  /* WebKit, Blink, Edge */
  &::-webkit-input-placeholder {
    color: ${colors.white};
  }

  /* Internet Explorer 10-11 */
  &:-ms-input-placeholder {
    color: ${colors.white};
  }

  /* Microsoft Edge */
  &::-ms-input-placeholder {
    color: ${colors.white};
  }

  /* Mozilla Firefox 19+ */
  &::-moz-placeholder {
    color: ${colors.white};
    opacity:  1;
  }
`;

export default class Search extends PureComponent {
  static propTypes = {};

  state = {
    value: ''
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Icon data-test="search-icon">
          <FontAwesomeIcon icon="search" />
        </Icon>
        <Input
          type="text"
          placeholder="Search by actor name"
          onChange={this.handleChange}
          value={this.state.value}
          data-test="search-input"
        />
        <Loading>
          <Loader
            width={20}
            height={20}
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            data-test="search-loading"
          />
        </Loading>
      </Form>
    );
  }
}
