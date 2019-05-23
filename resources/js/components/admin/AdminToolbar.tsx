import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import AdminDropdown from './AdminDropdown';
import { color, statusBorder } from '../../theme/Styles';
import { withStyles } from '@material-ui/core/styles';

const AdminAppBar = withStyles({
  root: {
    zIndex: 1201,
    backgroundColor: color.dark,
    color: color.white,
    borderBottom: statusBorder.primary
  }
})(AppBar);

export default class AdminToolbar extends React.Component<any, any> {
  render() {
    return (
      <AdminAppBar
        position="fixed"
        elevation={0}>
        <Toolbar
          variant="dense">
          <Typography
            style={{ flexGrow: 1 }}
            variant="h6"
            color="inherit">
            Admin
          </Typography>
          <AdminDropdown />
        </Toolbar>
      </AdminAppBar>
    );
  }
}