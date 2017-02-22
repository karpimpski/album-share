import React from 'react';
import {Link} from 'react-router';
import Header from '../../partials/Header';
import Client from '../../Client.js';
import './index.scss';

class Trade extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      self: {albums: []}, 
      other: {albums: []},
      offeringNumber: 2,
      requestingNumber: 1
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

  addOffering(){
    this.setState({offeringNumber: this.state.offeringNumber + 1});
  }

  addRequest(){
    this.setState({requestingNumber: this.state.requestingNumber + 1});
  }

  removeOffering(){
    if(this.state.offeringNumber > 1){
      this.setState({offeringNUmber: this.state.offeringNumber - 1});
    }
  }

  removeRequest(){
    if(this.state.requestingNumber > 1){
      this.setState({requestingNumber: this.state.requestingNumber - 1});
    }
  }

  render(){
    let offeringTemplate = 
    <select name='offering'>
      {this.state.self.albums.map((value, i) => {
        return (
          <option key={i}>{value}</option>
        )
      })}
    </select>

    let requestingTemplate = 
    <select name='requesting'>
      {this.state.other.albums.map((value, i) => {
        return (
          <option key={i}>{value}</option>
        )
      })}
    </select>
    let offering = [];
    let requesting = [];
    for(var i = 0; i < this.state.offeringNumber; i++){
      offering.push(offeringTemplate);
    }
    for(var j = 0; j < this.state.requestingNumber; j++){
      requesting.push(requestingTemplate);
    }

    return (
      <div>
        <Header />
        <form method='POST' action='/api/newtrade'>
          <input name='requester' value={this.state.self.username} className='hidden'/>
          <input name='target' value={this.state.other.username} className='hidden'/>
          <p>Giving: </p>
          {offering.map((off, index) => {
            return (
              <div>
                {off}<br/>
              </div>
            );
          })}
          <button onClick={this.addOffering.bind(this)}>Give More</button>
          <button onClick={this.removeOffering}>Give Less</button>
          <br/><br/>
          {requesting.map((request, x) => {
            return (
              <div key={x}>
                {request}<br/>
                <button onClick={this.addRequest}>Request More</button>
                <button onClick={this.removeRequest}>Request Less</button>
              </div>
            )
          })}
          

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Trade;