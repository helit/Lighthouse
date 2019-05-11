import React, { Component } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import {
  Dashboard,
  People,
  Description,
  Create,
  Settings
} from '@material-ui/icons';

export default class AdminDrawer extends Component {
  render() {
    return (
      <Drawer
        variant="permanent">
        <div style={{ marginTop: 48 }} />
        <List style={{ width: 240 }}>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary={"Users"}/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary={"Pages"}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary={"Posts"}/>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={"Settings"}/>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}