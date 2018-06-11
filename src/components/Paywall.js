import React, { Component } from 'react';

import PaymentButtons from './PaymentButtons.js';

class Paywall extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let type, subtype, textAccess = "Access";

		if (this.props.ActiveFile){
			type = this.props.ActiveFile.info.type;
			subtype = this.props.ActiveFile.info.subtype;

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
		return (
			<div className='paywall' style={(this.props.ActiveFile && this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned && !this.props.ArtifactState.isFetching) ? {} : {display: "none"}}>
				<div className="d-flex align-items-center justify-content-center text-center paywall-container">
					<div style={{width: "80%"}}>
						<h4 style={{marginBottom: "0px"}}>To {textAccess} this {(!subtype || subtype === "" || subtype === "Basic") ? type : subtype}</h4>
						<span>please...</span>
						<br/>
						<PaymentButtons
							artifact={this.props.Artifact}
							File={this.props.ActiveFile}
							payForFileFunc={this.props.payForFileFunc}
							buyFileFunc={this.props.buyFileFunc}
							/>
						<a href=""><p style={{margin: "75px 0px -75px 0px", color:"#fff", textDecoration: "underline"}}>How does this work? <span className="icon icon-help-with-circle"></span></p></a>
					</div>
				</div>
			</div>
		);
	}
}


export default Paywall;
