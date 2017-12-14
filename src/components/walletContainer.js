import React, { Component } from 'react';

import CoinCard from './CoinCard.js';
import PaperWallets from './PaperWallets.js';
import TransactionTable from './TransactionTable.js'

class WalletContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			Wallet: {}
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let User = newState.User;
		let Wallet = newState.Wallet;

		this.setState({
			User,
			Wallet
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	toggleSendModal(){
		this.setState({ sendModal: !this.state.sendModal });
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	render() {
		var coins = this.state.Wallet;
		var transactions = [];

		for (var key in coins){
			if (typeof coins[key] !== "object"){
				delete coins[key];
			}
			console.log(key)
		}

		for (var i = 0; i < 15; i++) {
			var coin = this.getRandomInt(1,4);

			if (coin === 1){
				coin = "florincoin"
			} else if (coin === 2){
				coin = "litecoin"
			} else if (coin === 3){
				coin = "bitcoin"
			}

			transactions.push({
				coin: coin,
				to: "Test Publisher",
				from: "Test User",
				amount: Math.random(),
				timestamp: Date.now()-(Math.random() * 10000)
			})
		}


		return (
			<div className="container">
				<div className="col-12">
					<h2 className="text-center">Wallet</h2>
				</div>
				<div className="col-12">
					<div className="row">
						{Object.keys(coins).map(key => {
							if (key === "bitcoin_testnet")
								return <div key={key} />

							return <CoinCard key={key} coin={key} info={this.state.Wallet[key]} Core={this.props.Core} store={this.props.store} NotificationSystem={this.props.NotificationSystem} />
						})}
					</div>
				</div>
				<br />
				<div className="col-12">
					<h5 className="text-center">Transactions</h5>
					<TransactionTable transactions={transactions} />
				</div>
			</div>
		);
	}
}

export default WalletContainer;