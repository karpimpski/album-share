import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import Index from './pages/Index';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}></Route>
  </Router>
), document.getElementById('root'))