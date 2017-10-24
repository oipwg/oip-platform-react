import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

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
	}
	render() {
		return (
			<div style={{display: "inline"}}>
				<Button id="TipPopover" onClick={this.toggle} className="btn btn-sm btn-outline-success btn-margin-right">
					<span className="icon-wallet icon"></span> Tip
				</Button>
				<Popover placement="top" isOpen={this.state.popoverOpen} target="TipPopover" toggle={this.toggle}>
					<PopoverHeader style={{textAlign: "center"}}>Send Tip</PopoverHeader>
					<PopoverBody>
						<button className="btn btn-sm btn-outline-success btn-margin-right" onClick={this.tip}><span className="icon icon-wallet"></span> $0.01</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right" onClick={this.tip}><span className="icon icon-wallet"></span> $0.10</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right" onClick={this.tip}><span className="icon icon-wallet"></span> $1</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right">Other</button>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default TipButton;