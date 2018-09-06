import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paginator from 'react-js-pagination';
import { rem } from 'polished';
import MoviesLists from './lists';
import { Loader, styles } from '../shared';
import Filter from './filters';
import Tags from './tags';

const Container = styled.div`
  margin-bottom: ${rem('100px')};
  padding: ${rem('20px')};
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
    isEmpty: PropTypes.bool
  };

  componentDidMount() {
    const { fetchAll, hasMovies, activePage } = this.props;

    if (!hasMovies) {
      fetchAll(activePage);
    }
  }

  handlePagination = pageNumber => {
    const { paginator, fetchAll, query, onPaginatorChange } = this.props;
    onPaginatorChange(pageNumber);

    const pageKey = `page-${pageNumber}`;
    if (paginator.includes(pageKey)) {
      return;
    }

    fetchAll(pageNumber, query);
  };

  render() {
    const { loading, totalResults, activePage, isEmpty } = this.props;
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
            primaryColor="#00ced1"
            secondaryColor="rgba(0, 206, 209, 0.1)"
            data-test="movies-loader"
          />
        </styles.LoaderWrapper>
      );
    }

    if (isEmpty) {
      content = (
        <EmptyState data-test="empty-state">
          No results found!
        </EmptyState>
      );
    }

    return (
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
    );
  }
}
