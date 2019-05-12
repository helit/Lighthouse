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

const menu = {
  top: [
    {
      text: 'Users',
      icon: 'people'
    },
  ],
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
        <div style={{ marginTop: 48 }} />
        <List style={{ width: 240 }}>
          {menu.top.map((item, key) => (
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