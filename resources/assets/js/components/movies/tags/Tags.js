import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { styles, colors } from '../../shared';

const Wrapper = styles.Container.extend`
  flex-direction: column;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${rem('15px')};
  padding-left: 0;
`;

const Tag = styled.div`
  padding: ${rem('8px')} ${rem('20px')};
  border: ${rem('1px')} solid ${colors.primary};
  border-radius: ${rem('25px')};
  color: ${colors.primary};
  font-weight: 400;
  font-size: ${rem('15px')};
`;

const ButtonWrapper = styled.div``;

const Tags = ({ tags, hasTags, buttonText, onClear }) => (
  <Wrapper>
    <TagsWrapper>
      {tags.map(tag => (
        <Tag key={tag.id} data-test="tag">
          {tag.name}
        </Tag>
      ))}
    </TagsWrapper>

    {hasTags && (
      <ButtonWrapper>
        <styles.Button
          data-test="clear-tag"
          onClick={onClear}
        >
          {buttonText}
        </styles.Button>
      </ButtonWrapper>
    )}
  </Wrapper>
);

Tags.propTypes = {
  tags: PropTypes.array,
  buttonText: PropTypes.string,
  hasTags: PropTypes.bool,
  onClear: PropTypes.func
};

export default Tags;
