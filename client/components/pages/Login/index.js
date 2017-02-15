import React from 'react';
import {Link} from 'react-router';

class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {username: '', password: ''}
	}

	changeInput(e){
		this.setState({message: e.target.value})
	}

  componentDidMount(){
    this.usernameInput.focus();
  }

  render(){
    return (
      <div>
      	<form action='/api/login' method='POST'>
          <input name='username' placeholder='Username' ref={(input) => { this.usernameInput = input; }} />
          <input name='password' type='password' placeholder='Password' />
          <input name='submit' type='submit' value='Submit' />
        </form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;