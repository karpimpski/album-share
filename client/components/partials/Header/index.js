import React from 'react';
import {Link} from 'react-router';
import './index.scss';
import Client from '../../Client.js';

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {user: null}
	}

	componentDidMount(){
		Client.get('/api/currentuser', (res) => {
			this.setState({user: res});
		});
	}
	
	render(){
		let links = '';
	  if(this.state.user){
	    links = <div><a href='/api/logout'>Logout</a> <Link to='/profile'>Profile</Link></div>
	  }
	  else{
	    links = <div><Link to='/login'>Login</Link> <Link to='/register'>Register</Link></div>
	  }
		return (
			<div id='header'>
				<Link to='/'>Home</Link> {links}
			</div>
		)
	}
}

export default Header;