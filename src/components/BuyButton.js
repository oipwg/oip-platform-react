import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CoinbaseModal from './CoinbaseModal.js';

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
		let _this = this;
		this.setState({buyModal: false}, function(){
			_this.setState({buyModal: true});
		})
	}
	render() {
		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-success" style={{padding: "2px 5px", marginRight: "3px"}} onClick={this.toggleBuyModal}><span className="fa fa-credit-card"></span> Buy</button>
				
				{this.state.buyModal ? <CoinbaseModal isOpen={this.state.buyModal} address={this.props.address} amount="1" currency={this.props.currency} /> : "" }
			</div>
		);
	}
}

export default BuyButton;