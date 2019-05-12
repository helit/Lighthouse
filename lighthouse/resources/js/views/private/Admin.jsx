import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { statusBorder } from '../../components/Styles';
import AdminToolbar from '../../components/admin/AdminToolbar';
import AdminDrawer from '../../components/admin/AdminDrawer';

// Views
import Users from './views/Users';
import Dashboard from './views/Dashboard';
import Pages from './views/Pages';
import Posts from './views/Posts';
import Menus from './views/Menus';
import Settings from './views/Settings';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding-left: 240px;
`;

const View = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  max-width: 1140px;
  margin: auto;
`;

export default class Admin extends Component {
  state = {
    currentView: <Dashboard />,
    viewTitle: 'Dashboard'
  }

  renderView = (view) => {
    switch (view) {
      case 'users':
        return this.setState({
          viewTitle: 'Users',
          currentView: <Users />
        });
      case 'dashboard':
        return this.setState({
          viewTitle: 'Dashboard',
          currentView: <Dashboard />
        });
      case 'pages':
        return this.setState({
          viewTitle: 'Pages',
          currentView: <Pages />
        });
      case 'posts':
        return this.setState({
          viewTitle: 'Posts',
          currentView: <Posts />
        });
      case 'menus':
        return this.setState({
          viewTitle: 'Menus',
          currentView: <Menus />
        });
      case 'settings':
        return this.setState({
          viewTitle: 'Settings',
          currentView: <Settings />
        });
    }
  }

  render() {
    const { currentView, viewTitle } = this.state;

    return (
      <div>
        <AdminToolbar />
        <AdminDrawer renderView={this.renderView} />
        <Content>
          <div style={{ marginTop: 48 }} />
          <Grid container spacing={0} style={{ height: '100%' }}>
            <Grid item xs={12}>
              <View>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                  {viewTitle}
                </Typography>
                <Paper
                  elevation={1}
                  square={true}
                  style={{
                    padding: '25px',
                    borderTop: statusBorder.primary
                  }}>
                  {currentView}
                </Paper>
              </View>
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}
