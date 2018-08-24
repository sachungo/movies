import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paginator from 'react-js-pagination';
import { rem } from 'polished';
import { MoviesLists } from './presenters';
import { Loader, styles } from '../shared';

const Container = styled.div`
  margin-bottom: ${rem('50px')};
`;

const TOTAL_COUNT = 100;
const PER_PAGE = 10;

export default class MoviesWrapper extends Component {
  static propTypes = {
    fetchAll: PropTypes.func.isRequired,
    fetchGenres: PropTypes.func.isRequired,
    hasGenres: PropTypes.bool,
    hasMovies: PropTypes.bool,
    nextPage: PropTypes.number,
    loading: PropTypes.bool,
    paginator: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  componentDidMount() {
    const {
      fetchAll,
      fetchGenres,
      hasGenres,
      hasMovies,
    } = this.props;

    if (!hasMovies) {
      fetchAll(this.state.activePage);
    }

    if (!hasGenres) {
      fetchGenres();
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
    const { loading } = this.props;
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
        {content}
        <Paginator
          hideDisabled
          activePage={activePage}
          totalItemsCount={TOTAL_COUNT}
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
