import React, { Component } from 'react';

import { Modal, ModalBody } from 'reactstrap';

import {setTryFaucet, faucetPrompt} from '../actions/Wallet/actions';

import DailyFaucetBlock from './DailyFaucetBlock.js';
import {connect} from "react-redux";

class DailyFaucetPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false
		}

		this.togglePrompt = this.togglePrompt.bind(this);
		this.onFaucetReceive = this.onFaucetReceive.bind(this);
		this.onFaucetCancel = this.onFaucetCancel.bind(this);

	}

	componentDidMount(){
        let showPrompt = this.props.Wallet.dailyFaucetPrompt;
        this.setState({showPrompt: showPrompt});
	}

	togglePrompt(){
		this.setState({showPrompt: !this.state.showPrompt})
	}
	onFaucetReceive(){
		this.props.faucetPrompt(false);
		this.props.setTryFaucet(false);
		this.setState({showPrompt: false})
	}
	onFaucetCancel(){
		this.props.faucetPrompt(false);
		this.props.setTryFaucet(false);
		this.setState({showPrompt: false})
	}

	render() {
		return (
			<div>
				{this.state.showPrompt ? 
				<Modal isOpen={this.state.showPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						<DailyFaucetBlock onFaucetReceive={this.onFaucetReceive} onFaucetCancel={this.onFaucetCancel} />
					</ModalBody>
				</Modal> 
				: 
				""}
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        Wallet: state.Wallet,
		Core: state.Core.Core
    }
}

const mapDispatchToProps = {
    setTryFaucet,
	faucetPrompt
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyFaucetPrompt);