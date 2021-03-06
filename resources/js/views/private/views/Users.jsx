import React, { Component } from 'react';
import api from '../../../services/api';
import {
  Typography,
} from '@material-ui/core';
import EnhancedTable from '../../../components/EnhancedTable';
import AdminPageLoader from '../../../components/AdminPageLoader';

let data = {
  rows: [
    { id: 'userid', numeric: false, disablePadding: false, label: 'Id' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  ],
  order: 'asc',
  orderBy: 'id',
  selected: [],
  data: [],
}

export default class Users extends Component {
  state = {
    users: [],
    isLoading: null,
  }

  getUsers = () => {
    let users = [];
    this.setState({ isLoading: true })

    api.get('/users')
      .then(response => {
        const data = response.data.data;
        data.map((user, index) => {
          users.push({
            id: index,
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          })
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({ isLoading: false });
      });

    return users;
  }

  componentDidMount() {
    data.data = this.getUsers();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <AdminPageLoader />
        ) : (
          <div>
            <Typography paragraph variant="body1">
              List of all users.
            </Typography>
            <EnhancedTable title={'Users'} tooltipTerm={'User'} data={data} />
          </div>
        )}
      </div>
    );
  }
}