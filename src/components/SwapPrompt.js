import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import SwapBlock from './SwapBlock.js';

class SwapPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false,
			type: "login"
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.togglePrompt = this.togglePrompt.bind(this);
		this.onSwap = this.onSwap.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let showPrompt = newState.Wallet.swapPrompt;
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
	onSwap(){
		this.setState({showPrompt: !this.state.showPrompt})
	}
	render() {

		return (
			<div>
				{this.state.showPrompt ? 
				<Modal isOpen={this.state.showPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						<SwapBlock Core={this.props.Core} store={this.props.store} onSwap={this.onSwap} />
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

export default SwapPrompt;