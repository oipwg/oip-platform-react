import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import BuyCryptoBlock from './BuyCryptoBlock.js';

class BuyPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false,
			type: "login"
		}

		this.togglePrompt = this.togglePrompt.bind(this);
		this.toggleLoginRegister = this.toggleLoginRegister.bind(this);

	}

	componentDidMount(){
        let showPrompt = this.props.Wallet.buyPrompt;
        this.setState({showPrompt: showPrompt});
	}

	togglePrompt(){
		this.setState({showPrompt: !this.state.showPrompt})
	}
	toggleLoginRegister(){
		this.setState({type: this.state.type === "login" ? "register" : "login"});
	}
	render() {

		return (
			<div>
				{this.state.showPrompt ? 
				<Modal isOpen={this.state.showPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						<BuyCryptoBlock onRegisterClick={this.toggleLoginRegister} />
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.togglePrompt}>Cancel</Button>
					</ModalFooter>
				</Modal> 
				: 
				""}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		Wallet: state.Wallet
	}
}

export default connect(mapStateToProps)(BuyPrompt);