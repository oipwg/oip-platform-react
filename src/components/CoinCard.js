import React, { Component } from 'react';

import BuyButton from './BuyButton.js';
import QRButton from './QRButton.js';
import SendButton from './SendButton.js';
import SwapButton from './SwapButton.js';

import btc_logo from '../assets/img/btcflat.svg';
import flo_logo from '../assets/img/flo.svg';
import ltc_logo from '../assets/img/ltcflat.svg';

const COIN_CONFIGS = {
	bitcoin: {
		order: 1,
		name: "Bitcoin",
		display: 1000000,
		presymbol: "bits",
		symbol: "uBTC",
		logo: btc_logo,
		buy: "coinbase",
		sell: false,
		trade: false
	},
	florincoin: {
		order: 2,
		name: "Flo",
		symbol: "FLO",
		logo: flo_logo,
		buy: false,
		sell: false,
		trade: true
	},
	litecoin: {
		order: 3,
		name: "Litecoin",
		symbol: "LTC",
		logo: ltc_logo,
		buy: "coinbase",
		sell: false,
		trade: false
	}
}

class CoinCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sendModal: false,
			qrModal: false
		}

		this.toggleSendModal = this.toggleSendModal.bind(this)
		this.toggleQRModal = this.toggleQRModal.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleSendModal() {
		this.setState({sendModal: !this.state.sendModal})
	}
	toggleQRModal() {
		this.setState({qrModal: !this.state.qrModal})
	}
	render() {
		let mainAddress = "";

		if (this.props.info && this.props.info.addresses && this.props.info.addresses[0] && this.props.info.addresses[0].address)
			mainAddress = this.props.info.addresses[0].address;

		let balance = parseFloat(this.props.info.balance.toFixed(4));

		if (COIN_CONFIGS[this.props.coin].display){
			console.log(this.props.info.balance);
			balance = parseFloat(parseFloat(this.props.info.balance * COIN_CONFIGS[this.props.coin].display).toFixed(4));
		}

		let currency;

		if (this.props.coin === 'litecoin')
			currency = 'ltc';
		else if (this.props.coin === 'bitcoin')
			currency = 'btc';

		return (
			<div className={"col-12 col-sm-6 col-md-4 order-" + COIN_CONFIGS[this.props.coin].order}>
				<div className="card">
					<div className="card-body text-center">
						<h3 className="card-title"><img src={COIN_CONFIGS[this.props.coin].logo} style={{height: "50px"}} alt={COIN_CONFIGS[this.props.coin].name} /> {COIN_CONFIGS[this.props.coin].name}</h3>
						<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>{balance} {COIN_CONFIGS[this.props.coin].presymbol} ({COIN_CONFIGS[this.props.coin].symbol})</h6>
						<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>${this.props.info.usd ? parseFloat(this.props.info.usd).toFixed(2) : "0.00"}</span></h4>
						<div style={{height: "10px"}}></div>
						{/*<button className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</button>*/}
						{COIN_CONFIGS[this.props.coin].buy === "coinbase" ? <BuyButton coinName={COIN_CONFIGS[this.props.coin].name} address={mainAddress} currency={currency} /> : ""}
						{COIN_CONFIGS[this.props.coin].trade ? <SwapButton coinName={COIN_CONFIGS[this.props.coin].name} address={mainAddress} /> : ""}
						<QRButton coinName={COIN_CONFIGS[this.props.coin].name} address={mainAddress} />
						<SendButton coinName={COIN_CONFIGS[this.props.coin].name} />
					</div>
				</div>
			</div>
		);
	}
}

export default CoinCard;