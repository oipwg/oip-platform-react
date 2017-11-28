import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CryptoQR from './CryptoQR.js';

class QRButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			qrModal: false
		}

		this.toggleQRModal = this.toggleQRModal.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleQRModal() {
		this.setState({qrModal: !this.state.qrModal})
	}
	render() {
		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-dark" style={{padding: "2px 5px", marginRight: "3px"}} onClick={this.toggleQRModal}><span className="fa fa-qrcode"></span> Show QR</button>
				<Modal isOpen={this.state.qrModal} toggle={this.toggleQRModal} className={this.props.className}>
					<ModalHeader toggle={this.qrModal} style={{margin: "auto"}}>Deposit {this.props.coinName}</ModalHeader>
					<ModalBody style={{margin: "auto"}} className="text-center">
						<CryptoQR type="receive" coin={this.props.coin} address={this.props.address} size={200} />
						<br />
						<code>{this.props.address}</code>
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

export default QRButton;