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
import Dashboard from './views/Dashboard';
import Pages from './views/Pages';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  padding-left: 240px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const View = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  max-width: 1140px;
  margin: auto;
`;

export default class Admin extends Component {
  state = {
    currentView: null,
    viewTitle: 'Dashboard'
  }

  renderView = (view) => {
    switch (view) {
      case 'pages':
        return <Pages />;
      default:
        return <Dashboard />;
    }
  }

  render() {
    const { currentView, viewTitle } = this.state;

    return (
      <div>
        <AdminToolbar />
        <AdminDrawer />
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
                  style={{ padding: '25px', borderTop: statusBorder.default }}>
                  {this.renderView(currentView)}
                </Paper>
              </View>
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}
