import 'normalize.css';
import '@themes/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'react-redux';

import { store } from '@helpers';
import App from './App';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(
  <Redux.Provider store={store}>
    <App />
  </Redux.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
