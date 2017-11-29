import React, { Component } from 'react';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import BuyButton from './BuyButton.js';
import QRButton from './QRButton.js';
import SendButton from './SendButton.js';
import SwapButton from './SwapButton.js';

import PaperWallet from './PaperWallet.js';

import btc_logo from '../assets/img/btcflat.svg';
import flo_logo from '../assets/img/flo.svg';
import ltc_logo from '../assets/img/ltcflat.svg';

import btc_bg from '../assets/img/bitcoin-pw-bg.png';
import flo_bg from '../assets/img/florincoin-pw-bg.png';
import ltc_bg from '../assets/img/litecoin-pw-bg.png';

export const COIN_CONFIGS = {
	bitcoin: {
		order: 1,
		name: "Bitcoin",
		display: 1000000,
		presymbol: "bits",
		symbol: "uBTC",
		logo: btc_logo,
		paperWalletBG: btc_bg,
		buy: "coinbase",
		sell: false,
		trade: false
	},
	florincoin: {
		order: 2,
		name: "Flo",
		symbol: "FLO",
		logo: flo_logo,
		paperWalletBG: flo_bg,
		buy: false,
		sell: false,
		trade: true
	},
	litecoin: {
		order: 3,
		name: "Litecoin",
		symbol: "LTC",
		logo: ltc_logo,
		paperWalletBG: ltc_bg,
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
			qrModal: false,
			settingsDropdown: false,
			printPaperWallet: false
		}

		this.toggleSendModal = this.toggleSendModal.bind(this)
		this.toggleQRModal = this.toggleQRModal.bind(this);
		this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
		this.printPaperWallet = this.printPaperWallet.bind(this);
		this.paperWalletPrinted = this.paperWalletPrinted.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleSettingsMenu(){
		this.setState({settingsDropdown: !this.state.settingsDropdown});
	}
	toggleSendModal() {
		this.setState({sendModal: !this.state.sendModal})
	}
	toggleQRModal() {
		this.setState({qrModal: !this.state.qrModal})
	}
	printPaperWallet(){
		this.setState({printPaperWallet: true});
	}
	paperWalletPrinted(){
		this.setState({printPaperWallet: false})
	}
	render() {
		let mainAddress = "";
		let privKey = "";

		if (this.props.info && this.props.info.addresses && this.props.info.addresses[0] && this.props.info.addresses[0].address){
			mainAddress = this.props.info.addresses[0].address;
			privKey = this.props.info.addresses[0].privKey;
		}

		let balance = parseFloat(this.props.info.balance.toFixed(4));

		if (COIN_CONFIGS[this.props.coin].display){
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
					<ButtonDropdown isOpen={this.state.settingsDropdown} toggle={this.toggleSettingsMenu}>
						<DropdownToggle className="btn btn-sm btn-none-grey" style={{width: "34px", right: "0px", position: "absolute"}}>
							<span className="fa fa-cog"></span>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem header>Settings</DropdownItem>
							<DropdownItem onClick={this.printPaperWallet}>Print Paper Wallet</DropdownItem>
							<DropdownItem>Export Backup</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>Advanced</DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
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
					{this.state.printPaperWallet ? <PaperWallet print={true} logo={COIN_CONFIGS[this.props.coin].logo} bg={COIN_CONFIGS[this.props.coin].paperWalletBG} public={mainAddress} private={privKey} onPrint={this.paperWalletPrinted} /> : ""}
				</div>
			</div>
		);
	}
}

export default CoinCard;