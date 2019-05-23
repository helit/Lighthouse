import * as React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import userStore from '../../stores/UserStore';
import {
  IconButton,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Paper,
  Menu
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

interface IState {
  open: boolean;
  anchorEl?: HTMLElement;
  placement: string;
}

export default class AdminDropdown extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      placement: null,
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <IconButton
          color="inherit"
          aria-owns={anchorEl ? 'admin-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="admin-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            component={(props: any) => <NavLink to="/logout" {...props} />}
            onClick={this.handleClose}
          >
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

