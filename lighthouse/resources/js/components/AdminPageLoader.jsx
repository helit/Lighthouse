import React, { Component } from 'react';
import {
  CircularProgress
} from '@material-ui/core';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

export default class AdminPageLoader extends Component {
  render() {
    return (
      <Wrapper>
        <CircularProgress color='secondary' />
      </Wrapper>
    );
  }
}