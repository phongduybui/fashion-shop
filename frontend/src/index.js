import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/theme';
import './assets/scss/style.scss';
import App from './App';

// TODO: move axios to separate instance. This is temporary
import axios from 'axios';
axios.defaults.baseURL = 'https://be-fashion-shop.onrender.com/';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
