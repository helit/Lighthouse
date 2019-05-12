import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          Posts
        </Typography>
      </div>
    );
  }
}