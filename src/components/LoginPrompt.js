import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import LoginBlock from './LoginBlock.js';
import RegisterBlock from './RegisterBlock.js';

class LoginPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			type: "login"
		}

		this.togglePrompt = this.togglePrompt.bind(this);
		this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
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
				{this.props.User.loginModalPrompt ?
				<Modal isOpen={this.props.User.loginModalPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						{this.state.type === "login" ? <LoginBlock User={this.props.User} onRegisterClick={this.toggleLoginRegister} /> : "" }
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

function mapStateToProps(state) {
    return {
    	store: state,
        User: state.User,
        Core: state.Core.Core
    }
}

export default connect(mapStateToProps)(LoginPrompt);