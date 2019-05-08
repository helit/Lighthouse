import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './navigation/PrivateRoute';

import Home from './views/public/Home';
import Login from './views/public/Login';
import Admin from './views/private/Admin';
import PageNotFound from './views/public/PageNotFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}
