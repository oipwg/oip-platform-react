import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CryptoQR from './CryptoQR.js';

import btc_logo from '../assets/img/btcflat.svg';
import flo_logo from '../assets/img/FLOflat2.png';
import ltc_logo from '../assets/img/ltcflat.svg';

const COIN_CONFIGS = {
	bitcoin: {
		order: 1,
		name: "Bitcoin",
		presymbol: "bits",
		symbol: "uBTC",
		logo: btc_logo
	},
	florincoin: {
		order: 2,
		name: "Florincoin",
		symbol: "FLO",
		logo: flo_logo
	},
	litecoin: {
		order: 3,
		name: "Litecoin",
		symbol: "LTC",
		logo: ltc_logo
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

		return (
			<div className={"col-12 col-sm-6 col-md-4 order-" + COIN_CONFIGS[this.props.coin].order}>
				<div className="card">
					<div className="card-body text-center">
						<h3 className="card-title"><img src={COIN_CONFIGS[this.props.coin].logo} style={{height: "50px"}} alt={COIN_CONFIGS[this.props.coin].name} /> {COIN_CONFIGS[this.props.coin].name}</h3>
						<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>{parseFloat(this.props.info.balance.toFixed(4))} {COIN_CONFIGS[this.props.coin].presymbol} ({COIN_CONFIGS[this.props.coin].symbol})</h6>
						<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>${this.props.info.usd ? parseFloat(this.props.info.usd).toFixed(2) : "0.00"}</span></h4>
						<div style={{height: "10px"}}></div>
						{/*<button className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</button>*/}
						<button className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px", marginRight: "3px"}} onClick={this.toggleQRModal}><span className="fa fa-qrcode"></span> Show QR</button>
						<button className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px", marginLeft: "3px"}} onClick={this.toggleSendModal}><span className="icon icon-wallet"></span> Send</button>
						{/*<button className="btn btn-sm btn-outline-success" style={{padding: "2px 5px"}}><span className="icon icon-credit"></span>Buy </button>*/}
					</div>
				</div>
				<Modal isOpen={this.state.sendModal} toggle={this.toggleSendModal} className={this.props.className}>
					<ModalHeader toggle={this.sendModal} style={{margin: "auto"}}>Send {COIN_CONFIGS[this.props.coin].name}</ModalHeader>
					<ModalBody>
						<div id="walletSpend" className="container">
							<div className="row">
								<div className="form-inline" style={{width: "100%"}}>
									<div className="col-8">
										<label>Address</label>
									</div>

									<div className="col-4">
										<label>Amount</label>
									</div>
								</div>
							</div>

							<div className="row" id="walletSpendTo">
								<div className="form-inline" style={{width: "100%"}}>
									<div className="col-8">
										<input type="text" style={{width: "inherit"}} className="form-control addressTo" data-original-title="" title="" />
									</div>
									<div className="col-4">
										<input type="text" style={{width: "inherit"}} className="form-control amount" data-original-title="" title="" placeholder="0.00" />
									</div>
								</div>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleSendModal}>Cancel</Button>{' '}
						<Button color="primary" onClick={this.toggleSendModal}>Send</Button>
					</ModalFooter>
				</Modal>
				<Modal isOpen={this.state.qrModal} toggle={this.toggleQRModal} className={this.props.className}>
					<ModalHeader toggle={this.qrModal} style={{margin: "auto"}}>Deposit {COIN_CONFIGS[this.props.coin].name}</ModalHeader>
					<ModalBody style={{margin: "auto"}} className="text-center">
						<CryptoQR type="receive" coin={this.props.coin} address={mainAddress} size={200} />
						<br />
						<code>{mainAddress}</code>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleQRModal}>Cancel</Button>{' '}
						<Button color="primary" onClick={this.toggleQRModal}>Send</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default CoinCard;