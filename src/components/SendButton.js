import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SendButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sendModal: false
		}

		this.toggleSendModal = this.toggleSendModal.bind(this)
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	toggleSendModal() {
		this.setState({sendModal: !this.state.sendModal})
	}
	render() {
		return (
			<div className="d-inline">
				<button className="btn btn-sm btn-outline-primary" style={{padding: "2px 5px", marginLeft: "3px"}} onClick={this.toggleSendModal}><span className="fa fa-paper-plane-o"></span> Send</button>
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
										<input type="text" style={{width: "inherit"}} className="form-control addressTo" data-original-title="" title="" />
									</div>
									<div className="col-4">
										<input type="text" style={{width: "inherit"}} className="form-control amount" data-original-title="" title="" placeholder="0.00" />
									</div>
								</div>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleSendModal}>Cancel</Button>{' '}
						<Button color="primary" onClick={this.toggleSendModal}>Send</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default SendButton;