import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { tryPaymentSend } from '../actions/Payment/thunks'

class SendButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sendModal: false,
			address: "",
			amount: "",
			addressStatus: "NO_INPUT",
			amountStatus: "NO_INPUT",
			sendState: "IDLE"
		}

		this.updateAddress = this.updateAddress.bind(this);
		this.updateAmount = this.updateAmount.bind(this);
		this.sendFunds = this.sendFunds.bind(this);
		this.toggleSendModal = this.toggleSendModal.bind(this)
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleSendModal() {
		this.setState({sendModal: !this.state.sendModal})
	}
	updateAddress(){
		let newValue = this.address.value;

		let validAddress = this.props.Core.Wallet.validateAddress(newValue, this.props.coin)

		if (newValue !== ""){
			this.setState({
				address: newValue,
				addressStatus: validAddress ? "VALID" : "INVALID"
			});
		} else {
			this.setState({
				address: newValue,
				addressStatus: "NO_INPUT"
			})
		}
	}
	updateAmount(){
		let newValue = this.amount.value;

		if (newValue !== ""){
			if (isNaN(newValue)){
				this.setState({
					amount: newValue,
					amountStatus: "INVALID"
				});
			} else if (parseFloat(newValue) > parseFloat(this.props.maxSend)){
				this.setState({
					amount: newValue,
					amountStatus: "NOT_ENOUGH_BALANCE"
				});
			} else {
				this.setState({
					amount: newValue,
					amountStatus: "VALID"
				});
			}
		} else {
			this.setState({
				amount: newValue,
				amountStatus: "NO_INPUT"
			})
		}
	}
	sendFunds(){
		this.setState({sendState: "IN_PROGRESS"})
		if (this.state.addressStatus === "VALID" && this.state.amountStatus === "VALID"){
			let supportedAddresses = {};
			supportedAddresses[this.props.coin] = this.state.address;

			this.props.store.dispatch(tryPaymentSend(this.props.Core, this.props.NotificationSystem, supportedAddresses, this.props.coin, this.state.amount, "pay", this.state.address, (success) => {
				console.log("Success!", success);
				this.setState({sendState: "SUCCESS"})
			}, (error) => {
				console.log("Error!", error)
				this.setState({sendState: "ERROR"})
			}))
		} else {
			setTimeout(() => {
				this.setState({sendState: "ERROR"})
			}, 200)
		}
	}
	render() {
		let addressClass = "";
		let amountClass = "";
		let sendBtnClass = "outline-primary";
		let sendBtnText = "Send";

		if (this.state.addressStatus === "VALID")
			addressClass = "is-valid"
		else if (this.state.addressStatus === "INVALID")
			addressClass = "is-invalid"

		if (this.state.amountStatus === "VALID")
			amountClass = "is-valid"
		else if (this.state.amountStatus === "INVALID" || this.state.amountStatus === "NOT_ENOUGH_BALANCE")
			amountClass = "is-invalid"

		if (this.state.sendState === "SUCCESS"){
			sendBtnClass = "outline-success";
			sendBtnText = "Success!"
		} else if (this.state.sendState === "ERROR"){
			sendBtnClass = "outline-danger";
			sendBtnText = "Error!"
		} else if (this.state.sendState === "IN_PROGRESS"){
			sendBtnClass = "outline-info";
			sendBtnText = "Sending..."
		}

		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px"}} onClick={this.toggleSendModal}><span className="fa fa-paper-plane-o"></span> Send</button>
				<Modal isOpen={this.state.sendModal} toggle={this.toggleSendModal} className={this.props.className}>
					<ModalHeader toggle={this.sendModal} style={{margin: "auto"}}>Send {this.props.coinName}</ModalHeader>
					<ModalBody>
						<div id="walletSpend" className="container">
							<div className="row">
								<div className="form-inline" style={{width: "100%"}}>
									<div className="col-8">
										<label>Address</label>
									</div>

									<div className="col-4">
										<label>Amount</label>
									</div>
								</div>
							</div>

							<div className="row" id="walletSpendTo">
								<div className="form-inline" style={{width: "100%"}}>
									<div className="col-8">
										<input ref={address => this.address = address} onInput={this.updateAddress} type="text" style={{width: "inherit"}} className={"form-control addressTo " + addressClass} data-original-title="" title="" />
									</div>
									<div className="col-4">
										<input ref={amount => this.amount = amount} onInput={this.updateAmount} type="text" style={{width: "inherit"}} className={"form-control amount " + amountClass} data-original-title="" title="" placeholder="0.00" />
									</div>
									{this.state.amountStatus === "NOT_ENOUGH_BALANCE" ? <p className="text-danger">You do not have enough balance to send that much {this.props.coinName}! The maximum you can send is {this.props.maxSend}.</p> : ""}
								</div>
							</div>
							<br />
							<button className="pull-left btn btn-outline-secondary" onClick={this.toggleSendModal}>Cancel</button>
							<button className={"pull-right btn btn-" + sendBtnClass} onClick={this.sendFunds}>{sendBtnText}</button>
						</div>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default SendButton;