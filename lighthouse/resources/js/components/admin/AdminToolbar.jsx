import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import AdminDropdown from './AdminDropdown';

export default class AdminToolbar extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        elevation={1}
        color="primary"
        style={{ zIndex: 1201 }}>
        <Toolbar
          variant="dense">
          <Typography
            style={{ flexGrow: "1" }}
            variant="h6"
            color="inherit">
            Admin
          </Typography>
          <AdminDropdown />
        </Toolbar>
      </AppBar>
    );
  }
}