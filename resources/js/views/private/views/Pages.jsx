import React, { Component } from 'react';
import api from '../../../services/api';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Icon,
  ListItemSecondaryAction,
  IconButton,
  Paper
} from '@material-ui/core';
import AdminPageLoader from '../../../components/AdminPageLoader';

export default class Pages extends Component {
  state = {
    pages: [],
    isLoading: null,
  }

  getPages = () => {
    let pages = [];
    this.setState({ isLoading: true })

    api.get('/pages')
      .then(response => {
        const data = response.data.data;
        data.map((page, index) => {
          pages.push({
            id: page.id,
            slug: page.slug,
            title: page.title,
            body: page.body,
            published: page.published,
            visibility: page.visibility
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false,
          pages: pages
        });
      });
  }

  componentDidMount() {
    this.getPages();
  }

  render() {
    const { isLoading, pages } = this.state;
    return (
      <div>
        {isLoading
          ?
            <AdminPageLoader />
          :
          <div>
            <Paper square={true} elevation={4}>
              <List>
              {pages.map((page, key) => (
                <ListItem key={key} button>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>description</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={page.title}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                      <Icon>delete</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              </List>
            </Paper>
          </div>
        }
      </div>
    );
  }
}