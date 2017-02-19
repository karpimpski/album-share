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
      receiving: [], 
      giving: [], 
      values: []
    }
	}

  componentDidMount(){
    Client.get('/api/currentuser', user => {
      this.setState({self: user, values: [user.albums[0]]});
      console.log(this.state.values);
    });
  }

  handleChange(event, i) {
    console.log(event);
    let values = this.state.values;
    values[i] = event.target.value;
    this.setState({values: values});
    console.log(this.state.values);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          You are giving:
          <select value={this.state.values[0]} onChange={this.handleChange.bind(this, event, 0)}>
            {this.state.self.albums.map((value, i) => {
              return (
                <option key={i} value={value}>{value}</option>
              )
            })}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Trade;