import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import SwapBlock from './SwapBlock.js';

class SwapPrompt extends Component {
	constructor(props){
		super(props);

		this.state = {
			showPrompt: false,
			type: "login"
		}

		this.togglePrompt = this.togglePrompt.bind(this);
	}

	componentDidMount(){
        let showPrompt = this.props.Wallet.swapPrompt;
        this.setState({showPrompt: showPrompt});
	}
	togglePrompt(){
		this.setState({showPrompt: !this.state.showPrompt})
	}

	render() {
		return (
			<div>
				{this.state.showPrompt ? 
				<Modal isOpen={this.state.showPrompt} toggle={this.togglePrompt} className={this.props.className}>
					<ModalBody style={{margin: "auto", width: "90%"}} className="text-center">
						<SwapBlock />
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
		Wallet: state.Wallet
	}
}

export default connect(mapStateToProps)(SwapPrompt);