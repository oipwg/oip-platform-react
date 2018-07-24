import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';

import Account from 'oip-account';

import ButtonCheckbox from './ButtonCheckbox.js';
import ReCAPTCHA from 'react-google-recaptcha';
import {loginSuccess, loginFailure} from "../actions/User/actions";
import {setAccount} from '../actions/Account/actions'

const STATUS = { 
	NO_INPUT: "NO_INPUT",
	TAKEN: "TAKEN",
	VALID: "VALID",
	INVALID: "INVALID",
	INUSE: "INUSE",
	PENDING: "PENDING",
	WAITING: "WAITING",
	ERROR: "ERROR",
	SUCCESS: "SUCCESS"
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
			recaptchaState: STATUS.NO_INPUT,
			verify: false,
			username: "",
			email: "",
			password: "",
			passwordConfirm: "",
			recaptcha: "",
			registrationStatus: STATUS.WAITING,
			redirectToLogin: false,
            redirectToHome: false,
            store_in_keystore: false
		}

		this.register = this.register.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
		this.updateVerify = this.updateVerify.bind(this);
		this.recaptcha = this.recaptcha.bind(this);
		this.loginClick = this.loginClick.bind(this);
		this.handleStorageClick = this.handleStorageClick.bind(this)

	}

	componentWillUnmount(){
		this.showRecaptcha = false;
	}
	componentDidMount(){
        let User = this.props.User;
        this.setState({ User });
		this.showRecaptcha = true;
	}

	handleStorageClick(e) {
            this.setState({store_in_keystore: ((e.target.name === "keystore"))})
    }
	register(){
		this.setState({registrationStatus: STATUS.PENDING});

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
		} else {

		}
		if (this.state.recaptcha === ""){
			abort = true;
			this.setState({verifyState: STATUS.INVALID});
		}

		// If we are not ready, abort.
		if (abort){
			this.setState({registrationStatus: STATUS.WAITING});
			return;
		}

		//@ToDo::Delete this or put it to empty string for production
        let keystore_url = "http://localhost:9196"
        let account = new Account(this.state.email, this.state.password, {discover: false, store_in_keystore: this.state.store_in_keystore, keystore_url: keystore_url});
        console.log("Account: ", account)
        account.create()
            .then( (succ) => {
                console.log("Successful reg: ", succ)
                this.account = account;
                this.props.setAccount(account)
                account.login(this.state.email, this.state.password)
                    .then( (succ) => {
                        console.log("Successful login: ", succ)
                        this.props.modal ? this.props.loginPrompt(false) : this.setState({redirectToHome: true})
                        this.props.loginSuccess(this.state.email);
                    })
                    .catch(err => {console.log(err)})
            })
            .catch(err => {
                this.setState({
                    registrationStatus: STATUS.ERROR
                });
                alert(`Error registering account: ${err}`);

            })

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
	recaptcha(response){
		if (response)
			this.setState({recaptcha: response, recaptchaState: STATUS.VALID})
		else
			this.setState({recaptcha: response, recaptchaState: STATUS.INVALID})
	}
	loginClick(){
       this.setState({redirectToLogin: true})
	}
	render() {
		var RegisterBtnTxt = "Register";

		if (this.state.registrationStatus === STATUS.PENDING){
			RegisterBtnTxt = "Registering..."
		} else if (this.state.registrationStatus === STATUS.SUCCESS){
			RegisterBtnTxt = "Register Success!"
		} else if (this.state.registrationStatus === STATUS.ERROR){
			RegisterBtnTxt = "Register Error!"
		}
		return (
	    	<div>
                {this.state.redirectToHome ? <Redirect to="/" push /> : ""}
                <h2>Please Register</h2>
				<hr className="" />
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
                <div className="row d-flex justify-content-center">
                    <button name="local" type="button" onClick={this.handleStorageClick} className={"btn btn" + (this.state.store_in_keystore ? "-outline-success" : "-success") + " btn-sm m-2"}>Store locally</button>
                    <button name="keystore" type="button" onClick={this.handleStorageClick} className={"btn btn" + (this.state.store_in_keystore ? "-info" : "-outline-info") + " btn-sm m-2"}>Store in keystore</button>
                </div>
				<div className="row">
					<div className="col-12 text-center" style={{fontSize: "13.5px", padding: "0px"}}>
						<p>
							Save your password now!
							<br />
							<strong>Password recovery is NOT possible</strong>
							<br />
							(We never see your password!)
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
						{this.showRecaptcha ? <ReCAPTCHA sitekey="6LdpKBYUAAAAACnfrr-0wEfMrLXURVs-pV5vhvM_" onChange={this.recaptcha} /> : ""}
						{this.state.recaptchaState === STATUS.INVALID ? 
							<p style={{color: "#dc3545", fontSize: "13.5px", marginTop: "5px", marginBottom: "0px"}}>Your recaptcha is invalid!</p>
							: ""}
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-12" style={{fontSize: "13.5px", margin: "0px 0px", marginBottom: "-10px"}}>
						By <strong>Registering</strong>, you agree to the <a href="/terms_and_conditions" data-toggle="modal" data-target="#t_and_c_m" data-ytta-id="-">Terms and Conditions</a>, including our Cookie Use.<p></p>
					</div>
				</div>
				<hr className="" />
				<div className="row">
					{this.state.redirectToLogin ? <Redirect to="/login" push /> : ""}
					<div className="col-xs-12 col-md-3 order-2 order-sm-1"><button className="btn btn-outline-secondary btn-block btn-lg" onClick={this.props.modal ? this.props.onLoginClick : this.loginClick}>Login</button></div>
					<div className="col-xs-12 col-md-9 order-1 order-sm-2"><button id="register" className="btn btn-success btn-block btn-lg" onClick={this.register} tabIndex="5">{RegisterBtnTxt}</button></div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
    loginSuccess,
    loginFailure,
    setAccount
};

function mapStateToProps(state) {
	return {
        User: state.User,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBlock);