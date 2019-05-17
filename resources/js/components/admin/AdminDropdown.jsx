import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import TokenUtils from '../../utils/TokenUtils';
import {
  IconButton,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Paper
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

export default class AdminDropdown extends Component {
  state = {
    open: false,
    hasLoggedOut: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    if (event.target.getAttribute('data-event') == 'logout') {
      this.handleLogout()
    }

    this.setState({ open: false });
  };

  handleLogout = () => {
    api.post('/logout')
      .then(response => {
        TokenUtils.removeToken();
        this.setState({ hasLoggedOut: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { open, hasLoggedOut } = this.state;

    return (
      <React.Fragment>
        {hasLoggedOut ? (
          <Redirect to='/login' />
        ) : (
          <React.Fragment>
            <IconButton
                color="inherit"
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}>
                <AccountCircle />
              </IconButton>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem data-event={'logout'} onClick={this.handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

