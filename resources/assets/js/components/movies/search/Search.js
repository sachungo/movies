import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader, colors } from '../../shared';
import Dropdown from './Dropdown';

const Form = styled.form`
  display: flex;
  margin-bottom: 0;
  width: ${rem('300px')};
  background-color: ${colors.search};
  border-radius: ${rem('8px')};
  position: relative;

  &:hover,
  &:focus,
  &:focus-within {
    background-color: ${colors.white};
  }
`;

const IconsWrapper = styled.div`
  flex: 0 0 ${rem('30px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = IconsWrapper.extend`
  svg path {
    fill: ${colors.white};
  }

  ${Form}:hover &,
  ${Form}:focus &,
  ${Form}:focus-within & {
    svg path {
      fill: ${colors.primary};
    }
  }
`;

const LoadingIcon = IconsWrapper.extend`
  visibility: hidden;

  svg rect {
    fill: transparent;
  }

  ${({ show }) => show && css`
    visibility: show;
  `}
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding:${rem('8px')} ${rem('5px')};
  background: none;
  caret-color: ${colors.primary};

  &::placeholder {
    color: ${colors.white};
  }

  ${Form}:hover &,
  ${Form}:focus &,
  ${Form}:focus-within & {
    color: ${colors.text};

    &::placeholder {
      color: ${colors.primary};
    }
  }
`;

const dummyData = [
  {
    id: 124,
    name: 'Testing A'
  },
  {
    id: 34,
    name: 'Testing B'
  },
  {
    id: 67898,
    name: 'Testing B'
  }
]
export default class Search extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool
  };

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
    const { loading } = this.props;
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
        <LoadingIcon show={loading}>
          <Loader
            width={20}
            height={20}
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            data-test="search-loading"
          />
        </LoadingIcon>
        <Dropdown items={dummyData} data-test="search-dropdown" />
      </Form>
    );
  }
}
