import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const COIN_CONFIGS = {
	bitcoin: {
		order: 1,
		name: "Bitcoin",
		presymbol: "bits",
		symbol: "uBTC",
		logo: "/assets/img/btcflat.svg"
	},
	florincoin: {
		order: 2,
		name: "Florincoin",
		symbol: "FLO",
		logo: "/assets/img/FLOflat2.png"
	},
	litecoin: {
		order: 3,
		name: "Litecoin",
		symbol: "LTC",
		logo: "/assets/img/ltcflat.svg"
	}
}

class CoinCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	render() {
		return (
			<div className={"col-12 col-sm-6 col-md-4 order-" + COIN_CONFIGS[this.props.coin].order}>
				<div className="card">
					<div className="card-body text-center">
						<h3 className="card-title"><img src={COIN_CONFIGS[this.props.coin].logo} style={{height: "50px"}} alt={COIN_CONFIGS[this.props.coin].name} /> {COIN_CONFIGS[this.props.coin].name}</h3>
						<h6 className="card-subtitle mb-2 text-muted" style={{marginBottom: "12px !important"}}>{parseFloat(this.props.info.balance.toFixed(4))} {COIN_CONFIGS[this.props.coin].presymbol} ({COIN_CONFIGS[this.props.coin].symbol})</h6>
						<h4 className="card-subtitle mb-2 text-muted"><span style={{color: "#28a745"}}>${this.props.info.usd ? parseFloat(this.props.info.usd).toFixed(2) : "0.00"}</span></h4>
						<div style={{height: "10px"}}></div>
						{/*<button className="btn btn-sm btn-outline-secondary" style={{padding: "2px 5px"}}><span className="icon icon-cog"></span> Manage</button>*/}
						<button className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px"}}><span className="fa fa-qrcode"></span> Show QR</button>
						<button className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px"}}><span className="icon icon-wallet"></span> Send</button>
						{/*<button className="btn btn-sm btn-outline-success" style={{padding: "2px 5px"}}><span className="icon icon-credit"></span>Buy </button>*/}
					</div>
				</div>
				<Modal isOpen={this.state.sendModal} toggle={this.toggleSendModal} className={this.props.className}>
					<ModalHeader toggle={this.sendModal}>Modal title</ModalHeader>
					<ModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggleSendModal}>Do Something</Button>{' '}
						<Button color="secondary" onClick={this.toggleSendModal}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default CoinCard;