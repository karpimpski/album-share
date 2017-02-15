import React from 'react';
import {Link} from 'react-router';

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {username: '', password: '', confirmation: ''}
	}

  componentDidMount(){
    this.usernameInput.focus();
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
      <div>
      	<form action='/api/register' method='POST' onSubmit={this.submit.bind(this)}>
          <input name='username' placeholder='Username' onChange={this.changeUsername.bind(this)} value={this.state.username} ref={(input) => { this.usernameInput = input; }} />
          <input name='password' type='password' placeholder='Password' onChange={this.changePassword.bind(this)}></input>
          <input type='password' placeholder='Confirm password' onChange={this.changeConfirmation.bind(this)}></input>
          <input name='submit' type='submit' value='Submit'></input>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default Register;