import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors } from '../../../shared';

const Item = styled.div``;

export default class FilterItem extends PureComponent {
  static propTypes = {
    criterion: PropTypes.string.isRequired
  }

  render() {
    const { criterion } = this.props;
    return (
      <Item data-test="filter-criterion">{criterion}</Item>
    );
  }
}
