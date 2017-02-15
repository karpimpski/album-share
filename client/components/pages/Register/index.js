import React from 'react';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {username: '', password: '', confirmation: ''}
	}

	changeUsername(e){
    this.setState({username: e.target.value})
  }

  changePassword(e){
    this.setState({password: e.target.value})
  }

  changeConfirmation(e){
    this.setState({confirmation: e.target.value});
  }

  submit(e){
    if(this.state.password !== this.state.confirmation) e.preventDefault();
  }

  render(){
    return (
    	<form action='/api/register' method='POST' onSubmit={this.submit.bind(this)}>
        <input name='username' placeholder='Username' onChange={this.changeUsername.bind(this)} value={this.state.username}></input>
        <input name='password' type='password' placeholder='Password' onChange={this.changePassword.bind(this)}></input>
        <input type='password' placeholder='Confirm password' onChange={this.changeConfirmation.bind(this)}></input>
        <input name='submit' type='submit' value='Submit'></input>
      </form>
    );
  }
}

export default Register;