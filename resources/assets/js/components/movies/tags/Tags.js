import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { styles, colors } from '../../shared';
import Tag from './Tag';

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
    totalResults: PropTypes.number,
    onRemoveTag: PropTypes.func,
    query: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isCleared: false
    };
  }

  componentDidUpdate(prevProps) {
    const resetItems =
      (this.props.query !== prevProps.query) &&
      this.props.isFiltered &&
      this.state.isCleared;
    if (resetItems) {
      this.props.onResetMovies();
      this.props.resetPagination();
      this.props.onFetchMovies(this.props.query);
      this.setState({ isCleared: false });
    }
  }

  handleClear = () => {
    this.props.onClear();
    if (this.props.isFiltered) {
      this.setState({
        isCleared: true
      });
    }
  };

  handleRemoveTag = tag => {
    this.props.onRemoveTag(tag, tag.criterion);
    if (this.props.isFiltered) {
      this.setState({
        isCleared: true
      });
    }
  }

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
                <Tag
                  key={tag.id}
                  tag={tag}
                  onClick={this.handleRemoveTag}
                  data-test="tag"
                />
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
