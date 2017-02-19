import React from 'react';
import {Link} from 'react-router';
import Client from '../../Client.js';
import Header from '../../partials/Header';

class NotFound extends React.Component {

  render(){
    
    return (
    	<div>
        <Header />
    		<h1>Not Found</h1>
      </div>
    );
  }
}

export default NotFound;