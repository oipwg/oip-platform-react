import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CryptoQR from './CryptoQR.js';

class SwapButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			swapModal: false
		}

		this.toggleSwapModal = this.toggleSwapModal.bind(this);
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleSwapModal() {
		this.setState({swapModal: !this.state.swapModal})
	}
	render() {
		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-info" style={{padding: "2px 5px", marginRight: "3px"}} onClick={this.toggleSwapModal}><span className="fa fa-retweet"></span> Swap</button>
				<Modal isOpen={this.state.swapModal} toggle={this.toggleSwapModal} className={this.props.className}>
					<ModalHeader toggle={this.swapModal} style={{margin: "auto"}}></ModalHeader>
					<ModalBody style={{margin: "auto"}} className="text-center">
						<h4>Swap</h4>
						<button>Flo</button>
						<h4>for</h4>
						<button>Bitcoin</button>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleSwapModal}>Cancel</Button>{' '}
						<Button color="primary" onClick={this.toggleSwapModal}>Send</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default SwapButton;