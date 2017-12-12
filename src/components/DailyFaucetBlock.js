import React, { Component } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import { tryDailyFaucet } from '../actions';

class DailyFaucetBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			recaptchaState: "NO_INPUT",
			recaptcha: ""
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.recaptcha = this.recaptcha.bind(this);
		this.tryDailyFaucet = this.tryDailyFaucet.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		// let showPrompt = newState.Wallet.buyPrompt;
		// this.setState({showPrompt: showPrompt});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	recaptcha(response){
		if (response)
			this.setState({recaptchaState: "RESPONSE_RECEIVED", recaptcha: response})
		else 
			this.setState({recaptchaState: "NEEDS_INPUT"})
	}
	tryDailyFaucet(){
		if (this.state.recaptcha === ""){
			this.setState({recaptchaState: "NEEDS_INPUT"})
			return;
		}

		let onSuccess = this.props.onFaucetReceive;
		this.props.store.dispatch(tryDailyFaucet(this.props.Core, this.state.recaptcha, function(success){
			onSuccess();
		}, function(error){
			// Needs error response...
		}))
	}
	render() {
		return (
			<div style={{width: "100%"}}>
				<h2>Balance Low</h2>
				<p>Your balance is low, you can claim your daily free $0.005 in Florincoin below.</p>
				<div style={{margin: "0px auto", marginTop: "-5px", marginBottom: "10px", display: "inline-block"}}>
					<ReCAPTCHA sitekey="6LdpKBYUAAAAACnfrr-0wEfMrLXURVs-pV5vhvM_" onChange={this.recaptcha} />
					{this.state.recaptchaState === "NEEDS_INPUT" ? <div className="text-danger">You must complete the reCaptcha!</div> : ""}
				</div>
				<button className="btn btn-outline-success" onClick={this.tryDailyFaucet}>Claim $0.005 Now</button>
			</div>
		);
	}
}

export default DailyFaucetBlock;