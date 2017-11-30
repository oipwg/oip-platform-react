import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import LoginBlock from './LoginBlock.js';
import RegisterBlock from './RegisterBlock.js';

class LoginPrompt extends Component {
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

		let showPrompt = newState.User.modalPrompt;
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
						{this.state.type === "login" ? <LoginBlock Core={this.props.Core} store={this.props.store} onRegisterClick={this.toggleLoginRegister} /> : "" }
						{this.state.type === "register" ? <RegisterBlock Core={this.props.Core} store={this.props.store} onLoginClick={this.toggleLoginRegister} /> : "" }
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

export default LoginPrompt;