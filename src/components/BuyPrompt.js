import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import BuyCryptoBlock from './BuyCryptoBlock.js';

class BuyPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false,
			type: "login"
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.togglePrompt = this.togglePrompt.bind(this);
		this.toggleLoginRegister = this.toggleLoginRegister.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let showPrompt = newState.Wallet.buyPrompt;
		this.setState({showPrompt: showPrompt});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
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
						<BuyCryptoBlock Core={this.props.Core} store={this.props.store} onRegisterClick={this.toggleLoginRegister} />
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

export default BuyPrompt;