import React, { Component } from 'react';

import { COIN_CONFIGS } from './CoinCard.js';

class BuyCryptoBlock extends Component {
	constructor(props){
		super(props);

		this.state = {};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		// let showPrompt = newState.Wallet.buyPrompt;
		// this.setState({showPrompt: showPrompt});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		return (
			<div style={{width: "100%"}}>
				<h2>Balance Low</h2>
				<p>Your wallet is low on funds, please select what kind of Coin you would like to buy.</p>
				<div style={{display: "flex"}}>
					<div className="card" style={{width: "45%", margin: "auto"}}>
						<div className="card-body">
							<img src={COIN_CONFIGS.bitcoin.logo} alt="Bitcoin Logo" />
							<h4>Bitcoin</h4>
							{/*<h5>$1234</h5>*/}
						</div>
					</div>
					<div className="card" style={{width: "45%", margin: "auto"}}>
						<div className="card-body">
							<img src={COIN_CONFIGS.litecoin.logo} alt="Litecoin Logo" />
							<h4>Litecoin</h4>
							{/*<h5>$1234</h5>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BuyCryptoBlock;