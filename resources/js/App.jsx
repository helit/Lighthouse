import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './navigation/PrivateRoute';

import {
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles';

import { theme } from './theme/Styles';

import Home from './views/public/Home';
import Login from './views/public/Login';
import Admin from './views/private/Admin';
import PageNotFound from './views/public/PageNotFound';

const styles = theme => ({});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
