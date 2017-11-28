import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CryptoQR from './CryptoQR.js';

class BuyButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buyModal: false
		}

		this.toggleBuyModal = this.toggleBuyModal.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleBuyModal() {
		this.setState({buyModal: !this.state.buyModal})
	}
	render() {
		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-success" style={{padding: "2px 5px", marginRight: "3px"}} onClick={this.toggleBuyModal}><span className="fa fa-credit-card"></span> Buy</button>
				<Modal isOpen={this.state.buyModal} toggle={this.toggleBuyModal} className={this.props.className}>
					<ModalHeader toggle={this.buyModal} style={{margin: "auto"}}>Buy More {this.props.coinName}</ModalHeader>
					<ModalBody style={{margin: "auto"}} className="text-center">
						<CryptoQR type="receive" coin={this.props.coin} address={this.props.address} size={200} />
						<br />
						<code>{this.props.address}</code>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleBuyModal}>Cancel</Button>{' '}
						<Button color="primary" onClick={this.toggleBuyModal}>Buy</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default BuyButton;