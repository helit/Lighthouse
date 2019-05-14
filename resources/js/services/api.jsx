import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function getToken() {
  return localStorage.getItem('token');
}

export default api;