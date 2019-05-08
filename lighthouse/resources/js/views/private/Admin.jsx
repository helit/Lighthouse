import React, { Component } from 'react';
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import styled from 'styled-components';
import { statusBorder } from '../../components/Styles';
import AdminToolbar from '../../components/admin/AdminToolbar';
import AdminSidePanel from '../../components/admin/AdminSidePanel';
import Dashboard from './views/Dashboard';
import Pages from './views/Pages';

const Wrapper = styled.div`
  height: 100vh;
  padding-top: 45px;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const View = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 60px;
  margin-right: 60px;
  max-width: 1140px;
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
      <Wrapper>
        <AdminToolbar />
        <Content>
          <Grid container spacing={0} style={{ height: '100%' }}>
            <Grid item xs={2}>
              <AdminSidePanel />
            </Grid>
            <Grid item xs={10}>
              <View>
                <Typography variant="h4" style={{ marginBottom: '20px' }}>
                  {viewTitle}
                </Typography>
                <Paper style={{ padding: '25px', borderTop: statusBorder.default }}>
                  {this.renderView(currentView)}
                </Paper>
              </View>
            </Grid>
          </Grid>
        </Content>
      </Wrapper>
    );
  }
}
