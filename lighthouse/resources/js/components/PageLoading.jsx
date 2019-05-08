import React, { Component } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class PageLoading extends Component {
  render() {
    return (
      <Wrapper>
        <CircularProgress size={100} thickness={5} />
      </Wrapper>
    );
  }
}
