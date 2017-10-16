import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import {
	Link
} from 'react-router-dom'

class ReportButton extends Component {
	constructor(props){
		super(props);

		this.state = {
			popoverOpen: false
		}

		this.toggle = this.toggle.bind(this);
	}
	toggle(){
		this.setState({
			popoverOpen: !this.state.popoverOpen
		})
	}
	render() {
		let _this = this;
		return (
			<div style={{display: "inline"}}>
				<Button id="ReportPopover" onClick={this.toggle} className="btn btn-sm btn-outline-dark btn-margin-right">
					...
				</Button>
				<Popover placement="top" isOpen={this.state.popoverOpen} target="ReportPopover" toggle={this.toggle}>
					<PopoverHeader style={{textAlign: "center"}}>More Tools</PopoverHeader>
					<PopoverBody>
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> Report</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right"><span className="icon icon-wallet"></span> $0.10</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right"><span className="icon icon-wallet"></span> $1</button>
						<button className="btn btn-sm btn-outline-success btn-margin-right">Other</button>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default ReportButton;