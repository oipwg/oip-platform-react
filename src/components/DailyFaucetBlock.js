import React, { Component } from 'react';
import {connect} from "react-redux";
import ReCAPTCHA from 'react-google-recaptcha';

// import { tryDailyFaucet } from '../actions/Wallet/thunks';

class DailyFaucetBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			recaptchaState: "NO_INPUT",
			recaptcha: ""
		};

		this.recaptcha = this.recaptcha.bind(this);
		this.tryDailyFaucet = this.tryDailyFaucet.bind(this);

	}

	recaptcha(response){
		if (response)
			this.setState({recaptchaState: "RESPONSE_RECEIVED", recaptcha: response})
		else 
			this.setState({recaptchaState: "NEEDS_INPUT"})
	}
	tryDailyFaucet() {
        if (this.state.recaptcha === "") {
            this.setState({recaptchaState: "NEEDS_INPUT"})
            // return;
        }

        //@ToDo::this.props.tryDailyFaucet()
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
				<div>
					<button className="btn btn-outline-secondary" onClick={this.props.onFaucetCancel} style={{marginRight: "5px"}}>No Thanks</button>
					<button className="btn btn-outline-success" onClick={this.tryDailyFaucet}>Claim $0.005 Now</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
    //tryDailyFaucet
};

export default connect(null, mapDispatchToProps)(DailyFaucetBlock);
