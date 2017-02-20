import React from 'react';
import {Link} from 'react-router';
import Header from '../../partials/Header';
import Client from '../../Client.js';

class Trades extends React.Component {

	constructor(props){
		super(props);
		this.state = {
      user: {},
      tradesReceived: [],
      tradesSent: []
    }
	}

  componentDidMount(){
    Client.get('/api/currentuser', user => {
      this.setState({user: user});
      console.log(user.trades);
      for(let i in user.trades){
        Client.get('/api/trade/' + user.trades[i], (res) => {
          if(res.requester === this.state.user.username){
            console.log(res.requester);
            let currentTrades = this.state.tradesSent;
            currentTrades.push(res);
            this.setState({tradesSent: currentTrades});
          }
          else{
            let currentTrades = this.state.tradesReceived;
            currentTrades.push(res);
            this.setState({tradesReceived: currentTrades});
          }
        });
      }
    });
  }

  render(){
    return (
      <div>
        <Header />
        <h1>Trades</h1>
        <h1>Trades To You</h1>
        {this.state.tradesReceived.map(function(trade, i){
          return (
            <div id='trade' key={i}>
              <p>You get: {trade.offering}</p>
              <p>You give: {trade.requesting}</p>
              <p>From: {trade.requester}</p>
            </div>
          )
        })}

        <h1>Trades From You</h1>
        {this.state.tradesSent.map(function(trade, i){
          return (
            <div id='trade' key={i}>
              <p>You give: {trade.offering}</p>
              <p>You get: {trade.requesting}</p>
              <p>Sent To: {trade.target}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Trades;