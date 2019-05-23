import axios from 'axios';
import userStore from '../stores/UserStore';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  config => {
    const token = userStore.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let refreshingToken = false;
let refreshPromise: Promise<any> | null = null;
api.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = {
      ...error.config,
      url: error.config.url.replace('/api', ''),
    };

    if (error.response.status === 401) {
      if (refreshingToken && refreshPromise) {
        return refreshPromise.then(() => {
          originalRequest.headers.Authorization = `Bearer ${getToken()}`;
          return axios(originalRequest);
        });
      } else {
        refreshingToken = true;

        refreshPromise = api
          .post('/refresh')
          .then(response => {
            const newToken = response.data.token;

            localStorage.setItem('token', newToken);
            setToken(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            refreshingToken = false;

            return axios(originalRequest);
          })
          .catch(refreshError => {
            if (
              refreshError.response.status === 401 ||
              refreshError.response.status === 500
            ) {
              localStorage.removeItem('token');
              if (window.location.pathname !== '/login') {
                window.location.href = '/login';
              }
            }

            return Promise.reject(refreshError);
          });

        return refreshPromise;
      }
    }

    return Promise.reject(error);
  }
);

const onTokenUpdatedCallbacks: Function[] = [];

function setToken(token: string): void {
  if (!api.defaults.headers) {
    api.defaults.headers = {};
  }
  const currentAuth = api.defaults.headers.common.Authorization;

  if (currentAuth !== `Bearer ${token}`) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    onTokenUpdatedCallbacks.forEach(cb => {
      cb(token);
    });
  }
}

function getToken() {
  return localStorage.getItem('token');
}

function onTokenUpdated(cb: (token: string) => void) {
  onTokenUpdatedCallbacks.push(cb);
}

export default api;
export { setToken, getToken, onTokenUpdated };