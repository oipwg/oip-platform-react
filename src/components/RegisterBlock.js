import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import { register } from '../actions';

import validator from 'validator';

import ButtonCheckbox from './ButtonCheckbox.js';
import Recaptcha from 'react-recaptcha';

const STATUS = { 
	NO_INPUT: "NO_INPUT",
	TAKEN: "TAKEN",
	VALID: "VALID",
	INVALID: "INVALID",
	INUSE: "INUSE"
}

class RegisterBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			User: {},
			usernameState: STATUS.NO_INPUT,
			emailState: STATUS.NO_INPUT,
			passwordState: STATUS.NO_INPUT,
			passwordSuggestState: {
				status: STATUS.VALID,
				eightCharacters: STATUS.NO_INPUT,
				oneUpperCase: STATUS.NO_INPUT,
				oneLowerCase: STATUS.NO_INPUT,
				oneNumber: STATUS.NO_INPUT,
				oneSpecial: STATUS.NO_INPUT
			},
			confirmState: STATUS.NO_INPUT,
			verifyState: STATUS.NO_INPUT,
			verify: false,
			username: "",
			email: "",
			password: "",
			passwordConfirm: ""
		}

		this.register = this.register.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
		this.updateVerify = this.updateVerify.bind(this);
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
	register(){
		let abort = false;
		if (this.state.usernameState !== STATUS.VALID){
			abort = true;
			this.setState({usernameState: STATUS.INVALID});
		}
		if (this.state.emailState !== STATUS.VALID){
			abort = true;
			this.setState({emailState: STATUS.INVALID});
		}
		if (this.state.passwordState !== STATUS.VALID){
			abort = true;
			this.setState({passwordState: STATUS.INVALID});
		}
		if (this.state.confirmState !== STATUS.VALID){
			abort = true;
			this.setState({confirmState: STATUS.INVALID});
		}
		if (!this.state.verify){
			abort = true;
			this.setState({verifyState: STATUS.INVALID});
		}

		// If we are not ready, abort.
		if (abort)
			return;

		// If we are ready, go ahead and start the registration process.

		this.props.store.dispatch(register(this.props.Core, this.state.username, this.state.email, this.state.password, this.props.onRegister, this.props.onRegisterError));

		try {
			localStorage.setItem("username", this.state.email);
			localStorage.setItem("pw", this.state.password);
		} catch (e) {}

	}
	updateUsername(){
		let newState = STATUS.VALID;

		if (this.username.value === "")
			newState = STATUS.NO_INPUT;

		this.setState({username: this.username.value, usernameState: newState});
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

		function hasDigit(str) {
			return (/^(?=.*\d)/.test(str));
		}
		function hasLowerCase(str) {
			return (/^(?=.*[a-z])/.test(str));
		}
		function hasUpperCase(str) {
			return (/^(?=.*[A-Z])/.test(str));
		}
		function hasSpecialCharacter(str) {
			return (/[^A-Za-z0-9]/.test(str));
		}
		function isAtLeastEight(str){
			return str.length >= 8;
		}

		var uppercase = hasUpperCase(this.password.value);
		var lowercase = hasLowerCase(this.password.value);
		var number = hasDigit(this.password.value);
		var specialCharacter = hasSpecialCharacter(this.password.value);
		var atLeastEight = isAtLeastEight(this.password.value);

		var newStatus = STATUS.INVALID;

		// If we are all good, or if there is no input, then hide the suggester
		if ((uppercase && lowercase && number && specialCharacter && atLeastEight) || newState === STATUS.NO_INPUT)
			newStatus = STATUS.VALID

		this.setState({password: this.password.value, passwordState: newState, passwordSuggestState: {
			status: 			newStatus,
			eightCharacters: 	atLeastEight 		? STATUS.VALID : STATUS.INVALID,
			oneUpperCase: 		uppercase 			? STATUS.VALID : STATUS.INVALID,
			oneLowerCase: 		lowercase 			? STATUS.VALID : STATUS.INVALID,
			oneNumber: 			number 				? STATUS.VALID : STATUS.INVALID,
			oneSpecial: 		specialCharacter 	? STATUS.VALID : STATUS.INVALID
		}});

		this.updatePasswordConfirm();
	}
	updatePasswordConfirm(){
		let newState = STATUS.INVALID;

		if (this.passwordConfirm.value === this.password.value)
			newState = STATUS.VALID;

		if (this.passwordConfirm.value === "")
			newState = STATUS.NO_INPUT;

		this.setState({passwordConfirm: this.passwordConfirm.value, confirmState: newState});
	}
	updateVerify(){
		this.setState({verify: !this.state.verify });
	}
	render() {
		return (
	    	<div>
				<h2>Please Register</h2>
				<hr className="colorgraph" />
				<div className="form-group">
					<input ref={username => this.username = username} onInput={this.updateUsername} type="text" className={"form-control input-lg" + (this.state.usernameState === STATUS.INVALID ? " is-invalid" : "") + (this.state.usernameState === STATUS.VALID ? " is-valid" : "")} placeholder="Username*" tabIndex="1" />
					{this.state.usernameState === STATUS.INVALID ? <div className="invalid-feedback" id="feedback_username">
						Please choose a Username
					</div> : ""}
				</div>
				<div className="form-group">
					<input ref={email => this.email = email} onInput={this.updateEmail} type="email" className={"form-control input-lg" + (this.state.emailState === STATUS.INVALID ? " is-invalid" : "") + (this.state.emailState === STATUS.VALID ? " is-valid" : "")} placeholder="Email Address" tabIndex="2"  />
					{this.state.emailState === STATUS.INUSE ? <div className="invalid-feedback">
						That email is already in use, please try another one
					</div> : ""}
					{this.state.emailState === STATUS.INVALID ? <div className="invalid-feedback">
						That email does not seem valid, please try another one
					</div> : ""}
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<input ref={password => this.password = password} onInput={this.updatePassword} type="password" className={"form-control input-lg" + (this.state.passwordState === STATUS.INVALID ? " is-invalid" : "") + (this.state.passwordState === STATUS.VALID ? " is-valid" : "")} placeholder="Password*" tabIndex="3"  />
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<input ref={passwordConfirm => this.passwordConfirm = passwordConfirm} onInput={this.updatePasswordConfirm} type="password" className={"form-control input-lg" + (this.state.confirmState === STATUS.INVALID ? " is-invalid" : "") + (this.state.confirmState === STATUS.VALID ? " is-valid" : "")} placeholder="Confirm Password*" tabIndex="4"  />
							{this.state.confirmState === STATUS.INVALID ? <div className="invalid-feedback" id="feedback_password_confirmation">
								Your passwords do not match
							</div> : ""}
						</div>
					</div>
					<div className="col-12">
						{this.state.passwordSuggestState.status === STATUS.INVALID ? 
						<div className="warning-feedback">
							We suggest your password contain a minimum of:
							<ul style={{listStyle: "none"}}>
								<li className={
									this.state.passwordSuggestState.eightCharacters === STATUS.VALID ? "text-success" : 
									this.state.passwordSuggestState.eightCharacters === STATUS.INVALID ? "text-danger" : "text-warning"
								}>
									<span className={this.state.passwordSuggestState.eightCharacters === STATUS.VALID ? "fa fa-check" : "fa fa-times"}></span> 8 Characters
								</li>
								<li className={
									this.state.passwordSuggestState.oneUpperCase === STATUS.VALID ? "text-success" : 
									this.state.passwordSuggestState.oneUpperCase === STATUS.INVALID ? "text-danger" : "text-warning"
								}>
									<span className={this.state.passwordSuggestState.oneUpperCase === STATUS.VALID ? "fa fa-check" : "fa fa-times"}></span> 1 Uppercase Letter
								</li>
								<li className={
									this.state.passwordSuggestState.oneLowerCase === STATUS.VALID ? "text-success" : 
									this.state.passwordSuggestState.oneLowerCase === STATUS.INVALID ? "text-danger" : "text-warning"
								}>
									<span className={this.state.passwordSuggestState.oneLowerCase === STATUS.VALID ? "fa fa-check" : "fa fa-times"}></span> 1 Lowercase Letter
								</li>
								<li className={
									this.state.passwordSuggestState.oneNumber === STATUS.VALID ? "text-success" : 
									this.state.passwordSuggestState.oneNumber === STATUS.INVALID ? "text-danger" : "text-warning"
								}>
									<span className={this.state.passwordSuggestState.oneNumber === STATUS.VALID ? "fa fa-check" : "fa fa-times"}></span> 1 Number
								</li>
								<li className={
									this.state.passwordSuggestState.oneSpecial === STATUS.VALID ? "text-success" : 
									this.state.passwordSuggestState.oneSpecial === STATUS.INVALID ? "text-danger" : "text-warning"
								}>
									<span className={this.state.passwordSuggestState.oneSpecial === STATUS.VALID ? "fa fa-check" : "fa fa-times"}></span> 1 Special Character
								</li>
							</ul>
						</div> : ""}
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-center" style={{fontSize: "13.5px", padding: "0px"}}>
						<p>
							Save your password now!
							<br />
							<strong>Password recovery is NOT possible</strong>
							<br />
							(passwords never touch our servers)
						</p>
					</div>
					<div className="col-12" style={{margin: "0px 0px"}}>
						<center>
							<ButtonCheckbox color={"secondary"} onClick={this.updateVerify} toggleState={this.state.verify} text={"I have taken responsibility for my password"} style={{fontSize: "12px", width: "300px", height: "50px"}} iconStyle={{fontSize: "25px", verticalAlign: "-5px"}} />
							{this.state.verifyState === STATUS.INVALID ? 
							<p id="passwordResponsibilityCheckbox" style={{color: "#dc3545", fontSize: "13.5px", marginTop: "5px", marginBottom: "0px"}}>Please agree that you have saved your password safely!</p>
							: ""}
						</center>
					</div>
				</div>
				<div className="row">
					<div style={{margin: "0px auto", marginTop: "10px", marginBottom: "-5px"}}>
						<Recaptcha sitekey="6LdpKBYUAAAAACnfrr-0wEfMrLXURVs-pV5vhvM_" />
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-12" style={{fontSize: "13.5px", margin: "0px 0px", marginBottom: "-10px"}}>
						By <strong>Registering</strong>, you agree to the <a href="/terms_and_conditions" data-toggle="modal" data-target="#t_and_c_m" data-ytta-id="-">Terms and Conditions</a>, including our Cookie Use.<p></p>
					</div>
				</div>
				<hr className="colorgraph" />
				<div className="row">
					<div className="col-xs-12 col-md-3 order-2 order-sm-1"><button className="btn btn-outline-secondary btn-block btn-lg" onClick={this.props.onLoginClick}>Login</button></div>
					<div className="col-xs-12 col-md-9 order-1 order-sm-2"><button id="register" className="btn btn-success btn-block btn-lg" onClick={this.register} tabIndex="5">Register</button></div>
				</div>
			</div>
		);
	}
}

export default RegisterBlock;