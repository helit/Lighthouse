import * as React from 'react';
import {
  CircularProgress
} from '@material-ui/core';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default class AdminPageLoader extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <CircularProgress color='secondary' />
      </Wrapper>
    );
  }
}