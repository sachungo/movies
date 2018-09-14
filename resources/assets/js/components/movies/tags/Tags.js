import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { styles, colors } from '../../shared';

const Wrapper = styles.Container.extend`
  flex-direction: column;
`;

const TagsWrapper = styled.div`
  &:not(:empty) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: ${rem('15px')};
    padding-left: 0;
    padding-top: 0;
  }
`;

const Tag = styled.div`
  padding: ${rem('8px')} ${rem('20px')};
  border: ${rem('1px')} solid ${colors.primary};
  border-radius: ${rem('25px')};
  color: ${colors.primary};
  font-weight: 400;
  font-size: ${rem('15px')};
  margin-right: ${rem('10px')};
  margin-top: ${rem('10px')};
`;

const ButtonWrapper = styled.div``;

const Count = styled.p`
  color: ${colors.notFound};
  font-size: ${rem('16px')};
  font-weight: 400;
  margin-bottom: 0;
`;

export default class Tags extends Component {
  static propTypes = {
    tags: PropTypes.array,
    buttonText: PropTypes.string,
    hasTags: PropTypes.bool,
    isFiltered: PropTypes.bool,
    onClear: PropTypes.func,
    onFetchMovies: PropTypes.func,
    resetPagination: PropTypes.func,
    onResetMovies: PropTypes.func,
    totalResults: PropTypes.number
  };

  handleClear = () => {
    this.props.onClear();

    if (this.props.isFiltered) {
      this.props.onResetMovies();
      this.props.onFetchMovies();
      this.props.resetPagination();
    }
  };

  render() {
    const {
      tags,
      hasTags,
      buttonText,
      onClear,
      isFiltered,
      totalResults
    } = this.props;
    const plural = totalResults > 1 ? 's' : '';

    return (
      <Fragment>
        {isFiltered && (
          <Count>{`${totalResults} result${plural} found`}</Count>
        )}

        {hasTags && (
          <Wrapper>
            <TagsWrapper>
              {tags.map(tag => (
                <Tag key={tag.id} data-test="tag">
                  {tag.name}
                </Tag>
              ))}
            </TagsWrapper>

            <ButtonWrapper>
              <styles.Button
                data-test="clear-tag"
                onClick={this.handleClear}
              >
                {buttonText}
              </styles.Button>
            </ButtonWrapper>
          </Wrapper>
        )}
      </Fragment>
    );
  }
}
