import React, { Component } from 'react';

import { COIN_CONFIGS } from './CoinCard.js';

class BuyCryptoBlock extends Component {
	constructor(props){
		super(props);

		this.state = {
			amount: undefined,
			currency: undefined,
			selectedAmount: undefined,
			selectedCurrency: undefined
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);
		this.selectOption = this.selectOption.bind(this);

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
	selectOption(type, value, secondValue){
		if (type === "amount"){
			this.setState({ amount: secondValue, selectedAmount: value })
		} else if (type === "currency"){
			this.setState({ currency: secondValue, selectedCurrency: value })
		}
	}
	render() {
		let activeAmountOne = false;
		let activeAmountTwo = false;
		let activeAmountThree = false;
		let activeAmountFour = false;
		let activeCurrencyOne = false;
		let activeCurrencyTwo = false;

		if (this.state.selectedAmount === 1){
			activeAmountOne = true;
		} else if (this.state.selectedAmount === 2){
			activeAmountTwo = true;
		} else if (this.state.selectedAmount === 3){
			activeAmountThree = true;
		} else if (this.state.selectedAmount === 4){
			activeAmountFour = true;
		}

		if (this.state.selectedCurrency === 1){
			activeCurrencyOne = true;
		} else if (this.state.selectedCurrency === 2){
			activeCurrencyTwo = true;
		}
		return (
			<div style={{width: "100%"}}>
				<h2>Balance Low</h2>
				<p>Your wallet has a low balance, please add some funds.</p>
				<h5>Select an Amount to Add:</h5>
				<div className="row">
					<div className="col-3">
						<button className={activeAmountOne ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1.25rem 2rem"}} onClick={() => {this.selectOption("amount", 1, 1)}}>
							<h5 className="text-success" style={{marginBottom: "0px"}}>$1</h5>
						</button>
					</div>
					<div className="col-3">
						<button className={activeAmountTwo ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1.25rem 2rem"}} onClick={() => {this.selectOption("amount", 2, 5)}}>
							<h5 className="text-success" style={{marginBottom: "0px"}}>$5</h5>
						</button>
					</div>
					<div className="col-3">
						<button className={activeAmountThree ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1.25rem 1.6rem"}} onClick={() => {this.selectOption("amount", 3, 10)}}>
							<h5 className="text-success" style={{marginBottom: "0px"}}>$10</h5>
						</button>
					</div>
					<div className="col-3">
						<button className={activeAmountFour ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1.25rem 1.2rem"}} onClick={() => {this.selectOption("amount", 4, "other")}}>
							<h5 style={{marginBottom: "0px"}}>Other</h5>
						</button>
					</div>
					{activeAmountFour ? <div className="col-12" style={{marginTop: "15px"}}>
						<div className="form-inline">
							<div className="form-group" style={{margin: "auto"}}>
								<label style={{marginRight: "5px"}}>Other Amount: </label>
								<input ref={other => this.otherAmount = other} className="form-control" />
							</div>
						</div>
					</div> : ""}
				</div>
				<br />
				<h5>Select which Coin to buy:</h5>
				<div className="row">
					<div className="col-6">
						<button className={activeCurrencyOne ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1rem 1.4rem", paddingBottom: "0px"}} onClick={() => {this.selectOption("currency", 1, "bitcoin")}}>
							<img src={COIN_CONFIGS.bitcoin.logo} alt="Bitcoin Logo" />
							<h4>Bitcoin</h4>
							<p className="text-success" style={{marginBottom: "0.25rem"}}>$16,452</p>
							<p className="text-info" style={{fontSize: "14px"}}>(Current Fee: $23.75)</p>
						</button>
					</div>
					<div className="col-6">
						<button className={activeCurrencyTwo ? "btn btn-secondary" : "btn btn-outline-secondary"} style={{padding: "1rem 1.4rem", paddingBottom: "0px"}} onClick={() => {this.selectOption("currency", 2, "litecoin")}}>
							<img src={COIN_CONFIGS.litecoin.logo} alt="Litecoin Logo" />
							<h4>Litecoin</h4>
							<p className="text-success" style={{marginBottom: "0.25rem"}}>$306</p>
							<p className="text-info" style={{fontSize: "14px"}}>(Current Fee: $0.03)</p>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default BuyCryptoBlock;