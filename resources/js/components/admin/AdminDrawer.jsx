import React, { Component, render } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { color, adminToolbar } from '../../theme/Styles';

const menu = {
  main: [
    {
      text: 'Dashboard',
      icon: 'dashboard'
    },
    {
      text: 'Pages',
      icon: 'description'
    },
    {
      text: 'Posts',
      icon: 'create'
    },
    {
      text: 'Menus',
      icon: 'clear_all'
    },
  ],
  bottom: [
    {
      text: 'Users',
      icon: 'people'
    },
    {
      text: 'Settings',
      icon: 'settings'
    },
  ],
}

export default class AdminDrawer extends Component {
  onChangeView = (view) => {
    this.props.renderView(view);
  }

  render() {
    return (
      <Drawer
        variant="permanent">
        <div style={{ marginTop: adminToolbar.margin }} />
        <List style={{ width: 240 }}>
          <Divider />
          {menu.main.map((item, key) => (
              <ListItem button
                key={key}
                onClick={() => this.onChangeView(item.text.toLowerCase())}>
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            )
          )}
          <Divider />
          {menu.bottom.map((item, key) => (
              <ListItem button
                key={key}
                onClick={() => this.onChangeView(item.text.toLowerCase())}>
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    );
  }
}