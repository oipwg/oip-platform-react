import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { tipFunc } from '../actions'

class TipButton extends Component {
	constructor(props){
		super(props);

		this.state = {
			customStart: false
		}

		this.toggle = this.toggle.bind(this);
		this.tip = this.tip.bind(this);
	}
	toggle(){
	}
	tip(){
		if (this.props.type === "custom" && !this.state.customStart){
			this.setState({customStart: true});
		} else {
			this.toggle();

			this.setState({tipping: true, tipSuccess: false, tipError: false});
			let _this = this;

			var amount;

			if (this.props.type === "custom")
				amount = parseFloat(this.refs.custom.value);
			else if (this.props.amount)
				amount = this.props.amount

			//WHAT TO DO WITH THIS DISPATCH??? PASS IN PROPS?

			// this.props.store.dispatch(tipFunc(this.props.Core, this.props.artifact, amount, this.props.piwik, this.props.NotificationSystem, function(success){
			// 	_this.setState({tipping: false, tipSuccess: true, tipError: false});
			// }, function(error){
			// 	_this.setState({tipping: false, tipSuccess: false, tipError: true});
			// 	console.error(error);
			// }));
		}
	}
	render() {
		//WHAT TO DO WITH THIS??? PASS IN PROPS?
		// let text = this.props.amount ? "$" + this.props.Core.util.createPriceString(this.props.amount) : "Other";
		//temporary
		let text = "Other";

		let color = "success";

		if (this.state.tipping){
			text = "tipping..."
			color = "info"
		}

		if (this.state.tipSuccess){
			color = "success"
			text = "Tipped!"
		}

		if (this.state.tipError){
			color = "danger"
			text = "Tip Error!"
		}

		return (
			<button
				className={"btn-margin-right btn btn-sm btn-outline-" + color}
				onClick={this.tip}>{this.state.customStart ? "" : <span className="fa fa-send-o"></span>}
				{this.state.customStart ? <input ref="custom" type="number" style={{width: "30px"}} /> : text}
				{this.state.customStart ? <span className="fa fa-send-o"></span> : ""}</button>
		);
	}
}

export default TipButton;