import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/register' component={Register}></Route>
  </Router>
), document.getElementById('root'))