import * as React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import userStore from '../../stores/UserStore';
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

interface IState {
  open: boolean;
  hasLoggedOut: boolean;
  anchorEl?: any;
  placement: string;
}

export default class AdminDropdown extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      hasLoggedOut: false,
      anchorEl: null,
      placement: null,
    };
  }

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

  handleClose = event => {
    if (this.state.anchorEl.contains(event.target)) {
      return;
    }

    if (event.target.getAttribute('data-event') == 'logout') {
      this.handleLogout()
    }

    this.setState({ open: false });
  };

  handleLogout = () => {
    userStore.destroy();
  }

  render() {
    const { open, hasLoggedOut } = this.state;
    let { anchorEl } = this.state;

    return (
      <React.Fragment>
        {hasLoggedOut ? (
          <Redirect to='/login' />
        ) : (
          <React.Fragment>
            <IconButton
                color="inherit"
                buttonRef={node => {
                  anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick('bottom')}>
                <AccountCircle />
              </IconButton>
              <Popper open={open} anchorEl={anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
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

