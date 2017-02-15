import React from 'react';
import {Link} from 'react-router';
import './index.scss';
import Client from '../../Client.js';

class Index extends React.Component {

	constructor(props){
		super(props);
		this.state = {user: {username: ''}}
	}

  componentDidMount(){
    Client.get('/api/currentuser', (res) => {
      this.setState({user: res});
    });
  }

  render(){
    let message = '';
    let links = '';
    if(this.state.user){
      if(this.state.user.username == ''){
        message = '';
      }
      else
        {message = <h1>Hello, {this.state.user.username}!</h1>
        links = <div><a href='/api/logout'>Logout</a></div>
      }
    }
    else{
      message = <h1>You aren't logged in.</h1>
      links = <div><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link></div>
    }
    
    return (
    	<div>
    		{message}
        {links}
      </div>
    );
  }
}

export default Index;