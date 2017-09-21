import React, { Component } from 'react';

class ContentExtraInfo extends Component {
	render() {
		let description = "";

		if (this.props.artifact){
			description = this.props.Core.Artifact.getDescription(this.props.artifact);
			console.log(this.props.artifact);
		}

		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published on: <strong>September 21st, 2017</strong></p>
				<p style={{textIndent: "40px", marginTop: "10px"}}>{description}</p>
				<div className="" style={{width: "100%", marginTop: "-5px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}}>See Less</button>
				</div>
			</div>
		);
	}
}

export default ContentExtraInfo;

// <p style={{textIndent: "40px", marginTop: "10px"}}>{description.length > 350 ? description.substring(0,350) + "..." : description}</p>
// <div className="" style={{width: "100%", marginTop: "-5px"}}>
// 	<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
// 	<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}}>See More</button>
// </div>