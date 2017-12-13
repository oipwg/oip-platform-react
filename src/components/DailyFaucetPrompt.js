import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { setTryFaucet, faucetPrompt } from '../actions';

import DailyFaucetBlock from './DailyFaucetBlock.js';

class DailyFaucetPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.togglePrompt = this.togglePrompt.bind(this);
		this.onFaucetReceive = this.onFaucetReceive.bind(this);
		this.onFaucetCancel = this.onFaucetCancel.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let showPrompt = newState.Wallet.dailyFaucetPrompt;
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
	onFaucetReceive(){
		this.props.store.dispatch(setTryFaucet(false));
	}
	onFaucetCancel(){
		this.props.store.dispatch(faucetPrompt(false));
		this.props.store.dispatch(setTryFaucet(false));
	}
	render() {

		return (
			<div>
				{this.state.showPrompt ? 
				<Modal isOpen={this.state.showPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						<DailyFaucetBlock Core={this.props.Core} store={this.props.store} onFaucetReceive={this.onFaucetReceive} onFaucetCancel={this.onFaucetCancel} />
					</ModalBody>
				</Modal> 
				: 
				""}
			</div>
		);
	}
}

export default DailyFaucetPrompt;