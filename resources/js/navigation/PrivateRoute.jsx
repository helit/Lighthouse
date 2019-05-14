import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from '../services/api';
import PageLoading from '../components/PageLoading';

export default class PrivateRoute extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: null
    }
  }

  componentDidMount() {
    api.post('/user')
      .then(() => {
        this.setState({ isAuthenticated: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isAuthenticated: false });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <div>
        {isAuthenticated === null ? (
          <PageLoading />
        ) : (
            <Route {...rest} render={(props) => (
              isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />
            )} />
          )}
      </div>
    );
  }
}
