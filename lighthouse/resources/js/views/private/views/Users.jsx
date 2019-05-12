import React, { Component } from 'react';
import {
  Typography,
} from '@material-ui/core';
import EnhancedTable from '../../../components/EnhancedTable';

const data = {
  rows: [
    { id: 'userid', numeric: false, disablePadding: false, label: 'Id'},
    { id: 'name', numeric: false, disablePadding: false, label: 'Name'},
    { id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    { id: 'role', numeric: false, disablePadding: false, label: 'Role'},
  ],
  order: 'asc',
  orderBy: 'id',
  selected: [3],
  data: [
    { id: 0, userid: 1, name: 'test user 1', email: 'test@test.com', role: 'admin' },
    { id: 1, userid: 2, name: 'test user 2', email: 'test@test.com', role: 'editor' },
    { id: 2, userid: 3, name: 'test user 3', email: 'test@test.com', role: 'user' },
    { id: 3, userid: 4, name: 'test user 4', email: 'test@test.com', role: 'user' },
    { id: 4, userid: 5, name: 'test user 5', email: 'test@test.com', role: 'user' },
    { id: 5, userid: 6, name: 'test user 6', email: 'test@test.com', role: 'user' },
    { id: 6, userid: 7, name: 'test user 7', email: 'test@test.com', role: 'user' },
    { id: 7, userid: 8, name: 'test user 8', email: 'test@test.com', role: 'user' },
    { id: 8, userid: 9, name: 'test user 9', email: 'test@test.com', role: 'user' },
    { id: 9, userid: 10, name: 'test user 10', email: 'test@test.com', role: 'user' },
    { id: 10, userid: 11, name: 'test user 11', email: 'test@test.com', role: 'user' },
    { id: 11, userid: 12, name: 'test user 12', email: 'test@test.com', role: 'user' },
    { id: 12, userid: 13, name: 'test user 13', email: 'test@test.com', role: 'user' },
    { id: 13, userid: 14, name: 'test user 14', email: 'test@test.com', role: 'user' },
  ],
  rowsPerPage: 5
}

export default class Users extends Component {
  render() {
    return (
      <div>
        <EnhancedTable title={'Users'} data={data} />
      </div>
    );
  }
}