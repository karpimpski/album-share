import React from 'react';
import Client from '../../Client';
import {Link} from 'react-router';

class EditProfile extends React.Component {
	constructor(props){
		super(props);
		this.state = {user: {username: ''}, inputs: []}
	}

	componentDidMount(){
		Client.get('/api/currentuser', (res) => {
			if(res){
				this.setState({user: res});
				this.setState({
					inputs: [this.state.user.name, this.state.user.city, this.state.user.state]
				});
			}
			else{
				window.location = '/';
			}
		});
	}

	handleChange(e, i){
		let inputs = this.state.inputs;
		inputs[i] = e.target.value;
		this.setState({inputs: inputs})
	}

	render(){
		return (
			<div id='profile'>
				<h1>{this.state.user.username}</h1>
				<Link to='/profile'>Cancel</Link>
				<form action='/api/editprofile' method='POST'>
					<label>Name</label>
					<input name='name' value={this.state.inputs[0]} onChange={this.handleChange.bind(this, 0)}/><br/>

					<label>City</label>
					<input name='city' value={this.state.inputs[1]} onChange={this.handleChange.bind(this, 1)}/><br/>

					<label>State</label>
					<input name='state' value={this.state.inputs[2]} onChange={this.handleChange.bind(this, 2)}/><br/>

					<input name='submit' type='submit' value='Submit' />
				</form>
			</div>
		)
	}
}

export default EditProfile;