import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { statusBorder, adminToolbar } from '../../theme/Styles';
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-left: 240px;
`;

const View = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  max-width: 1140px;
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
          <div style={{ marginTop: adminToolbar.margin }} />
          <Grid container spacing={0} style={{ height: '100%' }}>
            <Grid item xs={12}>
              <View>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                  {viewTitle}
                </Typography>
                {currentView}
              </View>
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}
