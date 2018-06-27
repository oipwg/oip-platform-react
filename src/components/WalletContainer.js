import React, { Component } from 'react';
import { connect } from 'react-redux';
import { COIN_CONFIGS } from './CoinCard.js';
import CoinCard from './CoinCard.js';
import TransactionTable from './TransactionTable.js'

class WalletContainer extends Component {
	toggleSendModal(){
		this.setState({ sendModal: !this.state.sendModal });
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	render() {
		var coins = this.props.Wallet;
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
						{Object.keys(coins).map(coin => {
							if (coin === "bitcoin_testnet")
								return <div key={coin} />

							return <CoinCard key={coin} coin={coin} info={this.props.Wallet[coin]} />
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

function mapStateToProps(state) {
	return {
		Wallet: state.Wallet
	}
}

export default connect(mapStateToProps)(WalletContainer);