import React from 'react';

class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {username: '', password: ''}
	}

	changeInput(e){
		this.setState({message: e.target.value})
	}

  render(){
    return (
    	<form action='/api/login' method='POST'>
        <input name='username' placeholder='Username'></input>
        <input name='password' type='password' placeholder='Password'></input>
        <input name='submit' type='submit' value='Submit'></input>
      </form>
    );
  }
}

export default Login;