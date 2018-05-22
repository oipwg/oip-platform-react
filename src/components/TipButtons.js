import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import TipButton from './TipButton.js';

class TipButtons extends Component {
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
	}
	render() {
		return (
			<div style={{display: "inline"}}>
				<Button id="TipPopover" onClick={this.toggle} className="btn btn-sm btn-outline-success btn-margin-right">
					<span className="fa fa-send-o"></span> Tip
				</Button>
				<Popover placement="top" isOpen={this.state.popoverOpen} target="TipPopover" toggle={this.toggle}>
					<PopoverHeader style={{textAlign: "center"}}>Send Tip</PopoverHeader>
					<PopoverBody>
						{/*pass in functions from Core?*/}
						<TipButton amount={0.001} fiat={"USD"} artifact={this.props.artifact} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
						<TipButton amount={0.01} fiat={"USD"} artifact={this.props.artifact} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
						<TipButton amount={0.10} fiat={"USD"} artifact={this.props.artifact} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
						<TipButton type={"custom"} artifact={this.props.artifact} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default TipButtons;