import React from 'react';
import {Link} from 'react-router';
import Header from '../../partials/Header';
import Client from '../../Client.js';

class Trade extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      self: {albums: []}, 
      other: {albums: []}, 
    }
	}

  componentDidMount(){
    Client.get('/api/currentuser', user => {
      Client.get('/api/user/' + this.props.params.other, other => {
        this.setState({
          self: user,
          other: other
        });
      });
    });
  }

  render(){
    return (
      <div>
        <Header />
        <form method='POST' action='/api/newtrade'>
          <input name='requester' value={this.state.self.username} />
          <input name='target' value={this.state.other.username} />
          <label>
            You are giving:
            <select name='offering'>
              {this.state.self.albums.map((value, i) => {
                return (
                  <option key={i}>{value}</option>
                )
              })}
            </select>
          </label>

          <label>
            You are getting:
            <select name='requesting'>
              {this.state.other.albums.map((value, i) => {
                return (
                  <option key={i}>{value}</option>
                )
              })}
            </select>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Trade;