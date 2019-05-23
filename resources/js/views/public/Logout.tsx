import * as React from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import PageLoading from '../../components/PageLoading';
import userStore from '../../stores/UserStore';

@observer
export default class Logout extends React.Component<any, any> {
  @observable redirect: boolean = false;

  @action
  setRedirect(value: boolean): void {
    this.redirect = value;
  }

  async componentDidMount() {
    await userStore.fetchUser();
    await userStore.destroy();
    this.setRedirect(true);
  }

  render() {
    if (this.redirect) {
      return <Redirect to="/" />;
    }

    return <PageLoading />;
  }
}