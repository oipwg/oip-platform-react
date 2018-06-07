import React, { Component } from 'react';

import FilesTable from './FilesTable.js';
import moment from 'moment';
import Linkify from 'react-linkify';

class ContentExtraInfo extends Component {
	constructor(props){
		super(props);

		this.state = {
			extendedView: false
		}

		// this.setDescriptionAndFiles = this.setDescriptionAndFiles.bind(this);
		this.toggleSeeMore = this.toggleSeeMore.bind(this);
	}

	toggleSeeMore(){
		this.setState({ extendedView: !this.state.extendedView })
	}
	render() {
		let niceTime, description, artifact;

		if (this.props.Artifact) {
			artifact = this.props.Artifact;
			niceTime = moment(artifact.getTimestamp() * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});
			description = artifact.getDescription();
		}


		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published: <strong>{this.props.ArtifactState.isFetching ? "loading..." : niceTime}</strong></p>
				<p style={this.state.extendedView ?
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap"}
					:
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap", maxHeight:"150px", textOverflow: "ellipsis", overflow: "hidden"}}
				>
					<Linkify>{this.props.ArtifactState.isFetching ? "loading..." : description}</Linkify>
				</p>
				<FilesTable
					Artifact={this.props.Artifact}
					ActiveFile={this.props.ActiveFile}
					extendedView={this.state.extendedView}
					FilePlaylist={this.props.FilePlaylist}
                    payForFileFunc={this.props.payForFileFunc}
                    buyFileFunc={this.props.buyFileFunc}
				/>
				<div className="" style={{width: "100%", marginTop: "-5px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}} onClick={this.toggleSeeMore}>{this.state.extendedView ? "See Less" : "See More"}</button>
				</div>
			</div>
		);
	}
}

export default ContentExtraInfo;
