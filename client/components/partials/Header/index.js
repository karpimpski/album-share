import React from 'react';
import {Link} from 'react-router';
import './index.scss';

class Header extends React.Component{
	
	render(){
		let links = '';
	  if(this.props.user){
	    links = <div><a href='/api/logout'>Logout</a></div>
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