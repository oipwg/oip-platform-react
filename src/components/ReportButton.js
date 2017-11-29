import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

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
		return (
			<div style={{display: "inline"}}>
				<Button id="ReportPopover" onClick={this.toggle} className="btn btn-sm btn-outline-dark btn-margin-right">
					...
				</Button>
				<Popover placement="top" isOpen={this.state.popoverOpen} target="ReportPopover" toggle={this.toggle}>
					<PopoverHeader style={{textAlign: "center"}}>More Tools</PopoverHeader>
					<PopoverBody style={{textAlign: "center"}}>
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> File DMCA Report</button>
						<hr />
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> Report Illegal Content</button>
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> Report Mislabeled Pornography</button>
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> Report for Encouraging or inciting Violence</button>
						<button className="btn btn-sm btn-outline-dark btn-margin-right"><span className="icon icon-error"></span> Report for Personal or Confidental information</button>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default ReportButton;