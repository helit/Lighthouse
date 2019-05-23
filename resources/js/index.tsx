import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { CssBaseline } from '@material-ui/core';

import App from './App';

import userStore from './stores/UserStore';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <Provider
      userStore={userStore}
    >
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
