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

export default class Posts extends Component {
  state = {
    posts: [],
    isLoading: null,
  }

  getPosts = () => {
    let posts = [];
    this.setState({ isLoading: true })

    api.get('/posts')
      .then(response => {
        const data = response.data.data;
        data.map((post, index) => {
          posts.push({
            id: post.id,
            slug: post.slug,
            title: post.title,
            body: post.body,
            published: post.published,
            visibility: post.visibility
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false,
          posts: posts
        });
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <div>
        {isLoading
          ?
            <AdminPageLoader />
          :
          <div>
            <Paper square={true} elevation={4}>
              <List>
              {posts.map((post, key) => (
                <ListItem key={key} button>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>description</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={post.title}
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