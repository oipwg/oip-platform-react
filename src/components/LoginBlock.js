import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import validator from 'validator';

import Account from 'oip-account'

import ButtonCheckbox from './ButtonCheckbox.js';

import {loginSuccess, loginFailure} from "../actions/User/actions";
import {setAccount} from "../actions/Account/actions"

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
			password: "",
			redirectToRegister: false,
            loginFetching: false,
            redirectToHome: false
		}

		this.login = this.login.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateRememberMe = this.updateRememberMe.bind(this);
		this.registerClick = this.registerClick.bind(this);
	}

    componentDidMount(){
        try {
            if (localStorage.oip_account){
                let account = new Account(localStorage.username, localStorage.pw)
                account.login()
                    .then(login_success => {
                        console.log(`Login Success`, login_success)
                        this.props.loginSuccess(localStorage.username);
                        this.props.setAccount(account)
                    })
                    .catch(err => {
                        console.log(`Error logging in: ${err}`);
                    })
            }
        } catch (e) {}
    }

	login(){
	    this.setState({loginFetching: true})
	    let account = new Account(this.state.email, this.state.password)
        account.login()
            .then(login_success => {
                this.setState({
                    redirectToHome: true
                });
                if (this.state.rememberMe) {
                    localStorage.username = this.state.email;
                    localStorage.pw = this.state.password;
                }
                console.log(`Login_success: ${JSON.stringify(login_success, null, 4)}`)
                this.props.loginSuccess(this.state.email);
                this.props.setAccount(account)
            })
            .catch(err => {
                this.props.loginFailure();
                alert(`Error logging in: ${err}`)
            })
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

	registerClick(){
	    this.setState({redirectToRegister: true});
	}

	render() {
		return (
			<div style={{width: "100%"}}>
                {this.state.redirectToHome ? <Redirect to="/" push /> : ""}
                <h2>Please Login</h2>
				<hr className="" />
				<div className="form-group">
					<input ref={email => this.email = email} onInput={this.updateEmail} type="text" 
                           name="email" id="email" className={"form-control input-lg" + 
                           (this.state.emailState === STATUS.INVALID ? " is-invalid" : "") + 
                           (this.state.emailState === STATUS.VALID ? " is-valid" : "")} 
                           placeholder="Email/Identifier" 
                    />
                    
					{this.state.emailState === STATUS.INVALID ? 
						<div className="invalid-feedback" id="feedback_email">
							Email/Identifier is invalid. Please provide your identifier or your account Email.
						</div> 
						: 
						""
					}
				</div>
				<div className="form-group">
					<input  ref={password => this.password = password} onInput={this.updatePassword} 
                            type="password" className={"form-control input-lg" + 
                            (this.state.passwordState === STATUS.INVALID ? " is-invalid" : "") + 
                            (this.state.passwordState === STATUS.VALID ? " is-valid" : "")} 
                            placeholder="Password" 
                    />
                    {this.state.passwordState === STATUS.INVALID ? 
                    <div className="invalid-feedback" id="feedback_password">
                        Invalid Password.
                    </div> : ""
					}
				</div>
				<ButtonCheckbox onClick={this.updateRememberMe} toggleState={this.state.rememberMe} text={"Remember Me"} />
				<hr className="" />
				<div className="row">
					<div className="col-12 col-sm-5 col-md-5 order-2 order-sm-1">
						{this.state.redirectToRegister ? <Redirect to="/register" push /> : ""}
						<button className="btn btn-lg btn-outline-secondary btn-block" 
                                onClick={this.registerClick}>Register
                        </button>
					</div>
					<div className="col-12 col-sm-7 col-md-7 order-1 order-sm-2">
						<button id="signin" className="btn btn-lg btn-success btn-block" 
                                onClick={this.login}>{this.state.loginFetching ? "Loading..." : "Login"}</button>
					</div>
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

export default connect(null, mapDispatchToProps)(LoginBlock);