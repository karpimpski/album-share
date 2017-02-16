import React from 'react';
import {Link} from 'react-router';
import './index.scss';
import Client from '../../Client.js';
import Header from '../../partials/Header';

class Index extends React.Component {

	constructor(props){
		super(props);
		this.state = {user: {username: ''}, albums: []}
	}

  componentDidMount(){
    Client.get('/api/currentuser', (user) => {
      Client.get('/api/allalbums', (albums) => {
        this.setState({user: user, albums: albums});
        console.log(albums);
      });
    });
  }

  render(){
    let message = '';
    let form = '';
    if(this.state.user){
      if(this.state.user.username !== ''){
        message = <h1>Hello, {this.state.user.username}!</h1>;
        form = <form action='/api/newalbum' method='POST'>
    		  <input name='album' />
    		  <input type='submit' />
    		</form>;
      }
    }
    else{
      message = <h1>You aren't logged in.</h1>
    }
    
    return (
    	<div>
        <Header user={this.state.user}/>
    		{message}
    		{form}

        {this.state.albums.map(function(album, i){
          return(
            <div key={i}>
              <h1>{album.name}</h1>
              <img src={album.image}/>
              <h2>{album.artist}</h2>
              <h3>{album.user}</h3>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Index;