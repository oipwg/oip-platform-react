import React, { Component } from 'react';

import CoinCard from './CoinCard.js';
import PaperWallets from './PaperWallets.js';

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
	render() {
		var coins = this.state.Wallet;

		for (var key in coins){
			if (typeof coins[key] !== "object"){
				delete coins[key];
			}
			console.log(key)
		}


		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center">Wallet</h2>
					</div>
					{Object.keys(coins).map(key => {
						if (key === "bitcoin_testnet")
							return <div key={key} />

						return <CoinCard key={key} coin={key} info={this.state.Wallet[key]} Core={this.props.Core} store={this.props.store} NotificationSystem={this.props.NotificationSystem} />
					})}
				</div>
			</div>
		);
	}
}

export default WalletContainer;