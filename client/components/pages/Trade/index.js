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
      getting: '', 
      giving: ''
    }
	}

  componentDidMount(){
    Client.get('/api/currentuser', user => {
      Client.get('/api/user/' + this.props.params.other, other => {
        this.setState({
          self: user,
          giving: user.albums[0],
          other: other,
          getting: other.albums[0]
        });
      });
    });
  }

  handleChange(event, i) {
    let values = this.state.values;
    values[i] = event.target.value;
    this.setState({values: values});
  }

  changeGiving(e){
    this.setState({giving: e.target.value});
    console.log(e.target.value);
  }

  changeGetting(e){
    this.setState({getting: e.target.value});
    console.log(e.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      self: this.state.self,
      giving: this.state.giving,
      other: this.state.other,
      getting: this.state.getting
    }
    Client.post('/api/newtrade', data, function(res){
      alert(res);
    });
  }

  render(){
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            You are giving:
            <select value={this.state.giving} onChange={this.changeGiving.bind(this)}>
              {this.state.self.albums.map((value, i) => {
                return (
                  <option key={i} value={value}>{value}</option>
                )
              })}
            </select>
          </label>

          <label>
            You are getting:
            <select value={this.state.getting} onChange={this.changeGetting.bind(this)}>
              {this.state.other.albums.map((value, i) => {
                return (
                  <option key={i} value={value}>{value}</option>
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