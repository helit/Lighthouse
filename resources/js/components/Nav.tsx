import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components'

const Wrapper = styled.div`
`;

export default class Nav extends React.Component<any, any> {
  render() {
    return (
      <Wrapper>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Nav
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '64px' }}></div>
      </Wrapper>
    );
  }
}