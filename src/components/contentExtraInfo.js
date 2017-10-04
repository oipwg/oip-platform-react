import React, { Component } from 'react';

import FilesTable from './filesTable.js';
import moment from 'moment';

class ContentExtraInfo extends Component {
	constructor(props){
		super(props);

		this.state = {
			description: "",
			files: [],
			timestamp: 0,
			niceTime: ""
		}

		this.setDescriptionAndFiles = this.setDescriptionAndFiles.bind(this);
	}
	componentWillMount(){
		this.setDescriptionAndFiles(this.props);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.artifact !== nextProps.artifact){
			this.setDescriptionAndFiles(nextProps);
		}
	}
	setDescriptionAndFiles(props){
		let description = "", files = [], tmpFiles = [], timestamp = 0;

		if (props.artifact){
			description = props.Core.Artifact.getDescription(props.artifact);
			files = props.Core.Artifact.getFiles(props.artifact);
			timestamp = props.Core.Artifact.getTimestamp(props.artifact);

			for (var i = files.length - 1; i >= 0; i--) {
				tmpFiles[i] = {};
				tmpFiles[i].icon = props.Core.Artifact.getEntypoIconForType(files[i].type);
				let sugPlay = files[i].sugPlay / props.Core.Artifact.getScale(props.artifact);
				let sugBuy = files[i].sugBuy / props.Core.Artifact.getScale(props.artifact);

				if (isNaN(sugPlay)){
					sugPlay = 0;
				}

				if (isNaN(sugBuy)){
					sugBuy = 0;
				}

				let playDecimal = sugPlay - parseInt(sugPlay);
				let buyDecimal = sugBuy - parseInt(sugBuy);

				if (playDecimal.toString().length === 3){
					sugPlay = sugPlay.toString() + "0";
				}
				if (buyDecimal.toString().length === 3){
					sugBuy = sugBuy.toString() + "0";
				}

				tmpFiles[i].fname = files[i].fname;
				tmpFiles[i].dname = files[i].dname;
				tmpFiles[i].type = files[i].type;
				tmpFiles[i].subtype = files[i].subtype;
				tmpFiles[i].disPlay = files[i].disPlay;
				tmpFiles[i].disBuy = files[i].disBuy;
				tmpFiles[i].sugPlay = sugPlay;
				tmpFiles[i].sugBuy = sugBuy;
			}

			let niceTime = moment(timestamp * 1000).calendar(null, {sameElse: "MMMM DD YYYY"});

			this.setState({description: description, files: tmpFiles, timestamp: timestamp, niceTime: niceTime})
		}
	}
	render() {
		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published: <strong>{this.state.niceTime}</strong></p>
				<p style={{textIndent: "40px", marginTop: "10px"}}>{this.state.description}</p>
				<FilesTable files={this.state.files} />
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