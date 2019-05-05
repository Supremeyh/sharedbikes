import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Admin from './admin'
import Router from './config/router'
import { Provider } from 'react-redux'
import store from './store'

const App = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));