import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paginator from 'react-js-pagination';
import { rem } from 'polished';
import MoviesLists from './lists';
import { Loader, styles, colors, StatusMessage, media } from '../shared';
import Filter from './filters';
import Tags from './tags';
import Search from './search';

const ContainerApp = styled.div`
  width: 100vw;
  height: 100%;
  padding-bottom: ${rem('5px')};
  position: relative;

  &:before {
    position: absolute;
    content: "";
    background: url(images/background_pattern.png), #99ebec;
    clip-path: polygon(0% 100%, 100% 70%, 100% 0%, 0% 0%);
    width: 100%;
    height: 100%;
    top: 0;
  }
`;

const Wrapper = styled.div`
  max-width: ${rem('1090px')};
  margin: 0 auto;
  position: relative;

  ${media.laptop`
    max-width: ${rem('885px')};
  `}

  ${media.big`
    max-width: ${rem('670px')};
  `}

  ${media.medium`
    max-width: ${rem('340px')};
  `}

  ${media.small`
    max-width: none;
  `}
`;

const Container = styled.div`
  margin-bottom: ${rem('100px')};
  padding: ${rem('20px')};
  background-color: ${colors.white};
  border-radius: ${rem('4px')};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${rem('20px')};
  padding-bottom: ${rem('20px')};
`;

const EmptyState = styled.div`
  margin-top: ${rem('20px')};
  font-weight: 500;
  font-size: ${rem('20px')};
  text-align: center;
`;

const PER_PAGE = 10;

export default class MoviesWrapper extends Component {
  static propTypes = {
    fetchAll: PropTypes.func.isRequired,
    hasMovies: PropTypes.bool,
    loading: PropTypes.bool,
    paginator: PropTypes.arrayOf(PropTypes.string),
    totalResults: PropTypes.number,
    query: PropTypes.string,
    onPaginatorChange: PropTypes.func,
    activePage: PropTypes.number,
    isEmpty: PropTypes.bool,
    error: PropTypes.string
  };

  componentDidMount() {
    const { fetchAll, hasMovies, activePage } = this.props;

    if (!hasMovies) {
      fetchAll(activePage);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      fetchAll,
      query,
      activePage,
      paginator
    } = this.props;
    const activePageChanged = prevProps.activePage !== activePage;
    const pageKey = `page_${activePage}`;
    if (activePageChanged && !paginator.includes(pageKey)) {
      fetchAll(activePage, query);
    }
  }

  handlePagination = pageNumber => {
    this.props.onPaginatorChange(pageNumber);
  };

  render() {
    const { loading, totalResults, activePage, isEmpty, error } = this.props;
    const showPaginator = totalResults > PER_PAGE;
    let content = (
      <MoviesLists data-test="movies-list" page={activePage} />
    );

    if(loading) {
      content = (
        <styles.LoaderWrapper>
          <Loader
            height={80}
            width={80}
            primaryColor={colors.primary}
            secondaryColor={colors.translucent}
            data-test="movies-loader"
          />
        </styles.LoaderWrapper>
      );
    }

    if (isEmpty || error) {
      const errorMessage = `${error} Try refreshing the page.`;
      content = (
        <StatusMessage
          type={isEmpty ? 'empty' : 'error'}
          description={error ? errorMessage : ''}
          data-test="empty-state"
        />
      );
    }

    return (
      <ContainerApp>
        <Wrapper>
          <SearchWrapper>
            <Search />
          </SearchWrapper>

          <Container>
            <Tags />
            <Filter />
            {content}

            {showPaginator && (
              <Paginator
                hideDisabled
                activePage={activePage}
                totalItemsCount={totalResults}
                onChange={this.handlePagination}
                itemsCountPerPage={PER_PAGE}
                itemClass="movies-list__item"
                activeLinkClass="movies-list__link--active"
                activeClass="movies-list__item--active"
                linkClass="movies-list__link"
                data-test="movies-paginator"
              />
            )}
          </Container>
        </Wrapper>
      </ContainerApp>
    );
  }
}
