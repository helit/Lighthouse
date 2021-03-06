import axios from 'axios';
import TokenUtils from '../utils/TokenUtils';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

api.interceptors.request.use(
  config => {
    const token = TokenUtils.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    // If the request succeeds, we don't have to do anything and just return the response
    return response
  },
  error => {
    const errorResponse = error.response
    if (error.response.status === 401) {
      return resetTokenAndReattemptRequest(error)
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error)
  }
);

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const resetToken = await TokenUtils.getResetToken(); // Your own mechanism to get the refresh token to refresh the JWT token
    if (!resetToken) {
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
    /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'post',
        url: '/api/refresh',
        data: {
          token: resetToken // Just an example, your case may vary
        }
      });
      if (!response.data) {
        return Promise.reject(error);
      }
      const newToken = response.data.token;
      TokenUtils.saveRefreshToken(newToken); // save the newly refreshed token for other requests to use
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token) {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default api;