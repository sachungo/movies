import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paginator from 'react-js-pagination';
import { rem } from 'polished';
import MoviesLists from './lists';
import { Loader, styles } from '../shared';
import Filter from './filters';

const Container = styled.div`
  margin-bottom: ${rem('100px')};
  margin-top: ${rem('100px')};
`;

const PER_PAGE = 10;

export default class MoviesWrapper extends Component {
  static propTypes = {
    fetchAll: PropTypes.func.isRequired,
    hasMovies: PropTypes.bool,
    loading: PropTypes.bool,
    paginator: PropTypes.arrayOf(PropTypes.string),
    totalPaginatorPages: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  componentDidMount() {
    const { fetchAll, hasMovies } = this.props;

    if (!hasMovies) {
      fetchAll(this.state.activePage);
    }
  }

  handlePagination = pageNumber => {
    this.setState({ activePage: pageNumber });

    const { paginator, fetchAll } = this.props;
    const pageKey = `page-${pageNumber}`;
    if (paginator.includes(pageKey)) {
      return;
    }

    fetchAll(pageNumber);
  };

  render() {
    const { loading, totalPaginatorPages } = this.props;
    const { activePage } = this.state;
    let content;
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
    } else {
      content = (
        <MoviesLists data-test="movies-list" page={activePage} />
      );
    }

    return (
      <Container>
        <Filter />
        {content}
        <Paginator
          hideDisabled
          activePage={activePage}
          totalItemsCount={totalPaginatorPages * PER_PAGE}
          onChange={this.handlePagination}
          itemsCountPerPage={PER_PAGE}
          itemClass="movies-list__item"
          activeLinkClass="movies-list__link--active"
          activeClass="movies-list__item--active"
          linkClass="movies-list__link"
          data-test="movies-paginator"
        />
      </Container>
    );
  }
}
