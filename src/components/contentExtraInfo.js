import React, { Component } from 'react';

import FilesTable from './filesTable.js';

class ContentExtraInfo extends Component {
	render() {
		let description = "", files = [];

		if (this.props.artifact){
			description = this.props.Core.Artifact.getDescription(this.props.artifact);
			files = this.props.Core.Artifact.getFiles(this.props.artifact);

			for (var i = files.length - 1; i >= 0; i--) {
				files[i].icon = this.props.Core.Artifact.getEntypoIconForType(files[i].type);
				files[i].sugPlay = files[i].sugPlay / this.props.Core.Artifact.getScale(this.props.artifact);
				files[i].sugBuy = files[i].sugBuy / this.props.Core.Artifact.getScale(this.props.artifact);
			}
		}

		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published on: <strong>September 21st, 2017</strong></p>
				<p style={{textIndent: "40px", marginTop: "10px"}}>{description}</p>
				<FilesTable files={files} />
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