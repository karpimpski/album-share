import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Trade from './pages/Trade';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/profile' component={Profile} />
    <Route path='/editprofile' component={EditProfile} />
    <Route path='/trade' component={Trade} />
  </Router>
), document.getElementById('root'))