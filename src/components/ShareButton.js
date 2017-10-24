import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class ShareButton extends Component {
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
				<Button id="SharePopover" onClick={this.toggle} className="btn btn-sm btn-outline-info btn-margin-right">
					<span className="icon-forward icon"></span> Share
				</Button>
				<Popover placement="top" isOpen={this.state.popoverOpen} target="SharePopover" toggle={this.toggle}>
					<PopoverHeader style={{textAlign: "center"}}>Share Artifact</PopoverHeader>
					<PopoverBody>
						<button className="btn btn-facebook btn-margin-right"><img src="/assets/img/facebook.png" alt="facebook" style={{height: "18px"}} /></button>
						<button className="btn btn-twitter btn-margin-right"><img src="/assets/img/twitter.png" alt="twitter" style={{height: "18px"}} /></button>
						<button className="btn btn-reddit btn-margin-right"><img src="/assets/img/reddit.png" alt="reddit" style={{height: "22px"}} /></button>
						<button className="btn btn-steem btn-outline-dark btn-margin-right"><img src="/assets/img/steemit.png" alt="steemit" style={{height: "18px"}} /></button>
						<button className="btn btn-gab" style={{padding: "6.5px"}}><img src="/assets/img/gab.png" alt="gab" style={{height: "22px"}} /></button>
					</PopoverBody>
				</Popover>
			</div>
		);
	}
}

export default ShareButton;