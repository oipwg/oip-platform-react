import React, { Component } from 'react';

import { COIN_CONFIGS } from './CoinCard.js';
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
		var transactions = {
			queued: [],
			unconfirmed: [],
			confirmed: { txs: [] }
		};

		for (var key in coins){
			if (typeof coins[key] !== "object"){
				delete coins[key];
			} else {
				if (coins[key].transactions){
					var coinInfo = {}
					try {
						coinInfo = {
							name: COIN_CONFIGS[key.toLowerCase()].name,
							logo: COIN_CONFIGS[key.toLowerCase()].logo
						}
					} catch(e) {}
					for (var i = 0; i < coins[key].transactions.queued.length; i++) {
						transactions.queued.push({...coins[key].transactions.queued[i], coin: coinInfo});
					}
					// for (var i = 0; i < coins[key].transactions.unconfirmed.length; i++) {
					// 	transactions.unconfirmed.push({...coins[key].transactions.unconfirmed[i], coin: coinInfo});
					// }
					for (var i = 0; i < coins[key].transactions.confirmed.txs.length; i++) {
						transactions.confirmed.txs.push({...coins[key].transactions.confirmed.txs[i], coin: coinInfo});
					}
				}
			}
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