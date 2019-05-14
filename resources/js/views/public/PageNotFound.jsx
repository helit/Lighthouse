import React, { Component } from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';

export default class PageNotFound extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center"
        style={{ flex: '1' }}>
        <Grid item>
          <Typography
            variant="h4"
            component="h3">
            404 | Page not found
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
