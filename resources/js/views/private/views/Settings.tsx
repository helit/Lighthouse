import * as React from 'react';
import {
  Typography
} from '@material-ui/core';

export default class Settings extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          Settings
        </Typography>
      </div>
    );
  }
}