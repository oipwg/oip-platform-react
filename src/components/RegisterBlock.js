import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import { login } from '../actions';

import validator from 'validator';

import ButtonCheckbox from './ButtonCheckbox.js';
import Recaptcha from 'react-recaptcha';

const STATUS = { 
	NO_INPUT: "NO_INPUT",
	VALID: "VALID",
	INVALID: "INVALID"
}

class RegisterBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			User: {},
			emailState: STATUS.NO_INPUT,
			passwordState: STATUS.NO_INPUT,
			confirmState: STATUS.NO_INPUT,
			email: "",
			password: "",
			passwordConfirm: ""
		}

		this.login = this.login.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
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
	updatePasswordConfirm(){
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
	    	<div>
				<h2>Please Register</h2>
				<hr className="colorgraph" />
				<div className="form-group">
					<input type="text" name="username" id="username" className="form-control input-lg" placeholder="Username*" tabIndex="1" />
					<div className="invalid-feedback" id="feedback_username">
						Please provide a Username.
					</div>
				</div>
				<div className="form-group">
					<input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabIndex="2"  />
					<div className="invalid-feedback" id="feedback_email">
						Email is invalid or is already in use, please choose another one.
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password*" tabIndex="3"  />
							<div className="warning-feedback" id="passwordValidation" style={{display:"none"}}>
								We suggest your password contain a minimum of:
								<ul>
									<li id="pwval-eight"><span className="icon icon-cross"></span> 8 Characters</li>
									<li id="pwval-upper"><span className="icon icon-cross"></span> 1 Uppercase Letter</li>
									<li id="pwval-lower"><span className="icon icon-cross"></span> 1 Lowercase Letter</li>
									<li id="pwval-number"><span className="icon icon-cross"></span> 1 Number</li>
									<li id="pwval-sc"><span className="icon icon-cross"></span> 1 Special Character</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password*" tabIndex="4"  />
							<div className="invalid-feedback" id="feedback_password_confirmation">
								Passwords must match
							</div>
						</div>
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
							<span className="button-checkbox">
								<button type="button" className="btn text-left btn-outline-secondary" data-color="secondary" tabIndex="7" style={{fontSize: "12px", width: "300px", height: "50px"}}><i className="state-icon fa fa-square-o" style={{fontSize: "25px", verticalAlign: "-5px"}}></i> I have taken responsibility for my password</button>
		                        <input type="checkbox" name="passwordCheckbox" id="passwordCheckbox" className="d-none" value="1" />
							</span>
							<p id="passwordResponsibilityCheckbox" style={{color: "#dc3545", fontSize: "13.5px", marginTop: "5px", marginBottom: "0px", display: "none"}}>Please agree that you have saved your password safely!</p>
						</center>
					</div>
				</div>
				<div className="row">
					<div style={{margin: "0px auto", marginTop: "10px", marginBottom: "-5px"}}><Recaptcha sitekey="6LdpKBYUAAAAACnfrr-0wEfMrLXURVs-pV5vhvM_" /></div>
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
					<div className="col-xs-12 col-md-9 order-1 order-sm-2"><button id="register" className="btn btn-success btn-block btn-lg" onclick="onRegisterClick();" tabIndex="5">Register</button></div>
				</div>
			</div>
		);
	}
}

export default RegisterBlock;