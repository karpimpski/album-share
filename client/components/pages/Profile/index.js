import React from 'react';
import Client from '../../Client';
import {Link} from 'react-router';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {user: {username: ''}}
	}

	componentDidMount(){
		Client.get('/api/currentuser', (res) => {
			if(res){
				this.setState({user: res})
			}
			else{
				window.location = '/';
			}
		});
	}

	render(){
		const name = this.state.user.name ? <p>Name: {this.state.user.name}</p> : null;
		const city = this.state.user.city ? <p>City: {this.state.user.city}</p> : null;
		const state = this.state.user.state ? <p>State: {this.state.user.state}</p> : null;
		return (
			<div id='profile'>
				<h1>{this.state.user.username}</h1>
				<Link to='/editprofile'>Edit</Link>
				<div>{name}</div>
				<div>{city}</div>
				<div>{state}</div>
			</div>
		)
	}
}

export default Profile;