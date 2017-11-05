import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';

class Paywall extends Component {
	constructor(props){
		super(props);

		this.state = {
			ActiveFile: {
				isPaid: false,
				hasPaid: false,
				info: {

				}
			},
			CurrentArtifact: {

			}
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentDidUpdate(){
		//this.stateDidUpdate();
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let ActiveFile = newState.FilePlaylist[active];

		let stateObj = {
			ActiveFile: ActiveFile,
			CurrentArtifact: CurrentArtifact
		}

		if (stateObj && this.state !== stateObj){
			this.setState(stateObj);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let type, subtype, textAccess = "Access";

		if (this.state.ActiveFile){
			type = this.state.ActiveFile.info.type;
			subtype = this.state.ActiveFile.info.subtype;

			if (type === "Video"){
				textAccess = "Watch"
			} else if (type === "Image"){
				textAccess = "View"
			} else if (type === "Audio"){
				textAccess = "Listen to"
			}

			if (subtype === "F-HD1080")
				subtype = "Movie"
		}
		let _this = this;
		return (
			<div id='paywall' style={(this.state.ActiveFile && this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid && !this.state.ActiveFile.owned && !this.state.CurrentArtifact.isFetching) ? {} : {display: "none"}}>
				<div className="d-flex align-items-center justify-content-center text-center paywall-container">
					<div style={{width: "80%"}}>
						<h4 style={{marginBottom: "0px"}}>To {textAccess} this {(!subtype || subtype === "" || subtype === "Basic") ? type : subtype}</h4>
						<span>please...</span>
						<br/>
						<PaymentButtons artifact={this.state.CurrentArtifact.artifact} File={this.state.ActiveFile} Core={this.props.Core} store={this.props.store} />
						<a href=""><p style={{margin: "75px 0px -75px 0px", color:"#fff", textDecoration: "underline"}}>How does this work? <span className="icon icon-help-with-circle"></span></p></a>
					</div>
				</div>
			</div>
		);
	}
}

/*
<div className="col-5">
	<button className="btn btn-outline-success" style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}} onclick="unlockContent()"><span className="icon icon-wallet"	style={{marginRight: "5px"}}></span>Pay 3 bits</button>
</div>
<div className="col-2" style={{paddingTop: "5px"}}>
	or
</div>
<div className="col-5">
	<button className="btn btn-outline-danger" style={{float:"left", marginRight: "25px", marginLeft: "-25px", padding: "5px"}}><span className="icon icon-controller-play" style={{marginRight: "0px"}}></span>Watch an Ad</button>
</div>
*/

export default Paywall;