import React, { Component } from 'react';
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  Dashboard,
  People,
  Description,
  Settings
} from '@material-ui/icons';
import styled from 'styled-components';
import { color, general } from '../Styles';

const SidePanel = styled.div`
  color: ${color.white};
  height: 100%;
  box-shadow: ${general.boxShadow};
`;

export default class AdminSidePanel extends Component {
  render() {
    return (
      <SidePanel>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText inset primary="Dashboard" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText inset primary="Users" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText inset primary="Pages" />
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </MenuItem>
        </MenuList>
      </SidePanel>
    );
  }
}