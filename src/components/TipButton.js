import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { tipFunc } from '../actions'

class TipButton extends Component {
	constructor(props){
		super(props);

		this.state = {
			popoverOpen: false
		}

		this.toggle = this.toggle.bind(this);
		this.tip = this.tip.bind(this);
	}
	toggle(){
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}
	tip(){
		this.toggle();

		this.setState({tipping: true, tipSuccess: false, tipError: false});
		let _this = this;

		this.props.store.dispatch(tipFunc(this.props.Core, this.props.artifact, this.props.amount, this.props.piwik, this.props.NotificationSystem, function(success){
			_this.setState({tipping: false, tipSuccess: true, tipError: false});
		}, function(error){
			_this.setState({tipping: false, tipSuccess: false, tipError: true});
			console.error(error);
		}));
	}
	render() {
		let text = this.props.amount ? "$" + this.props.Core.util.createPriceString(this.props.amount) : "Other";
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
			<button className={"btn-margin-right btn btn-sm btn-outline-" + color} onClick={this.tip}><span className="fa fa-send-o"></span> {text}</button>
		);
	}
}

export default TipButton;