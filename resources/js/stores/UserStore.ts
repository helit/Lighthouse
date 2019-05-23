import { observable, action, computed } from 'mobx';
import api from '../services/api';
import { AxiosResponse } from 'axios';
import User, { IUser } from '../models/User';

export class UserStore {
  @observable user: IUser | null = null;
  @observable badCredentials: boolean = false
  @observable rememberMe: boolean = false

  @computed
  get isAuthenticated() {
    return !!this.user;
  }

  @action
  setUser(data): void {
    if (data === null) {
      this.user = null;
    } else {
      this.user = User.create({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      });
    }
  }

  @action
  fetchUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      api.post('/user')
        .then((response: AxiosResponse) => {
          this.setUser(response.data.data);
          resolve();
        })
        .catch(e => {
          reject(e);
        })
    });
  }

  login(email: string, password: string, rememberMe: boolean): Promise<any> {
    return api
      .post('/login', { email, password, rememberMe })
      .then(async response => {
        this.setUser(response.data.data);
        this.saveToken(response.data.token);
        return true;
      })
      .catch(error => {
        this.badCredentials = true;
        console.log(error);
        return false;
      });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken():string | null {
    return localStorage.getItem('token');
  }

  destroy(): Promise<any> {
    return new Promise(resolve => {
      api.post('/logout')
        .then(() => {
          this.setUser(null);
          localStorage.removeItem('token');
          resolve();
        })
    })
  }
};

export default new UserStore();