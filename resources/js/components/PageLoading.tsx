import * as React from 'react';
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

export default class PageLoading extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <CircularProgress color='secondary' size={100} thickness={5} />
      </Wrapper>
    );
  }
}
