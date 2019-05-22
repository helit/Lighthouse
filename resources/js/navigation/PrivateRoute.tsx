import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userStore from '../stores/UserStore';
import PageLoading from '../components/PageLoading';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { setToken } from '../services/api';

interface IProps {
  path: string;
  component: React.ComponentType<any>;
}

@observer
export default class PrivateRoute extends React.Component<IProps, any> {
  @observable displayContent: boolean = false;
  @observable redirectToLogin: boolean = false;

  @action
  setDisplayContent(): void {
    this.displayContent = true;
  }

  @action
  setRedirectToLogin(): void {
    this.redirectToLogin = true;
  }

  @action
  async checkAuth(): Promise<any> {
    return new Promise(async (resolve: () => void) => {

      const token = userStore.getToken();

      if (token) {
        try {
          setToken(token);
          await userStore.fetchUser();
          resolve();
        } catch (e) {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  componentWillMount() {
    this.checkAuth().then(() => {
      if (userStore.isAuthenticated) {
        this.setDisplayContent();
      } else {
        this.setRedirectToLogin();
      }
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;

    if (this.displayContent) {
      return (
        <Route {...rest} render={props => (
          <Component {...props} />
        )} />
      );
    }

    if (this.redirectToLogin) {
      return <Redirect to='/login' />;
    }

    return <PageLoading />;
  }
}
