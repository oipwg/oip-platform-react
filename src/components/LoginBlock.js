import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import { login } from '../actions';

import validator from 'validator';

import ButtonCheckbox from './ButtonCheckbox.js';

const STATUS = { 
	NO_INPUT: "NO_INPUT",
	VALID: "VALID",
	INVALID: "INVALID"
}

class LoginBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			User: {},
			emailState: STATUS.NO_INPUT,
			passwordState: STATUS.NO_INPUT,
			confirmState: STATUS.NO_INPUT,
			rememberMe: false,
			email: "",
			password: ""
		}

		this.login = this.login.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateRememberMe = this.updateRememberMe.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let User = newState.User;

		this.setState({
			User
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	login(){
		this.props.store.dispatch(login(this.props.Core, this.state.email, this.state.password));

		if (this.state.rememberMe){
			try {
				localStorage.setItem("username", this.state.email);
				localStorage.setItem("pw", this.state.password);
			} catch (e) {}
		}
	}
	updateEmail(){
		let newState = this.state.emailState;

		let isEmail = validator.isEmail(this.email.value);
		newState = isEmail ? STATUS.VALID : STATUS.INVALID;

		if (this.email.value === "")
			newState = STATUS.NO_INPUT;

		this.setState({email: this.email.value, emailState: newState});
	}
	updatePassword(){
		let newState = STATUS.VALID;

		if (this.password.value === "")
			newState = STATUS.NO_INPUT;

		this.setState({password: this.password.value, passwordState: newState});
	}
	updateRememberMe(){
		this.setState({rememberMe: !this.state.rememberMe });
	}
	render() {
		return (
			<div style={{width: "100%"}}>
				<h2>Please Login</h2>
				<hr className="colorgraph" />
				<div className="form-group">
					<input ref={email => this.email = email} onInput={this.updateEmail} type="text" name="email" id="email" className={"form-control input-lg" + (this.state.emailState === STATUS.INVALID ? " is-invalid" : "") + (this.state.emailState === STATUS.VALID ? " is-valid" : "")} placeholder="Email/Identifier" />
					{this.state.emailState === STATUS.INVALID ? 
						<div className="invalid-feedback" id="feedback_email">
							Email/Identifier is invalid. Please provide your identifier or your account Email.
						</div> 
						: 
						""
					}
				</div>
				<div className="form-group">
					<input ref={password => this.password = password} onInput={this.updatePassword} type="password" className={"form-control input-lg" + (this.state.passwordState === STATUS.INVALID ? " is-invalid" : "") + (this.state.passwordState === STATUS.VALID ? " is-valid" : "")} placeholder="Password" />
					{this.state.passwordState === STATUS.INVALID ? 
						<div className="invalid-feedback" id="feedback_password">
							Invalid Password.
						</div>
						:
						""
					}
				</div>
				<ButtonCheckbox onClick={this.updateRememberMe} toggleState={this.state.rememberMe} text={"Remember Me"} />
				<hr className="colorgraph" />
				<div className="row">
					<div className="col-12 col-sm-5 col-md-5 order-2 order-sm-1">
						<button className="btn btn-lg btn-outline-secondary btn-block" onClick={this.props.onRegisterClick}>Register</button>
					</div>
					<div className="col-12 col-sm-7 col-md-7 order-1 order-sm-2">
						<button id="signin" className="btn btn-lg btn-success btn-block" onClick={this.login}>{this.state.User.isFetching ?  "loading..." : "Login"}</button>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginBlock;