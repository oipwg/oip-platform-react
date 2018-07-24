import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import LoginBlock from './LoginBlock.js';
import RegisterBlock from './RegisterBlock.js';
import {loginPrompt} from '../actions/User/actions';

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
		this.props.loginPrompt(false)
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
						{this.state.type === "login" ? <LoginBlock User={this.props.User} modal={true} onRegisterClick={this.toggleLoginRegister} /> : "" }
						{this.state.type === "register" ? <RegisterBlock modal={true} onLoginClick={this.toggleLoginRegister} /> : "" }
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
        User: state.User
    }
}

const mapDispatchToProps = {
    loginPrompt
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPrompt);