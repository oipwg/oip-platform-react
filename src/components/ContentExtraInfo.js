import React, { Component } from 'react';
import moment from 'moment';
import Linkify from 'react-linkify';
import PropTypes from "prop-types";

import FilesTable from './FilesTable.js';


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
			artifact = this.props.artifact;
			niceTime = moment(artifact.getTimestamp() * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});
			description = artifact.getDescription();
		}


		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published: <strong>{this.props.artifactState.isFetching ? "loading..." : niceTime}</strong></p>
				<p style={this.state.extendedView ?
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap"}
					:
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap", maxHeight:"150px", textOverflow: "ellipsis", overflow: "hidden"}}
				>
					<Linkify>{this.props.artifactState.isFetching ? "loading..." : description}</Linkify>
				</p>
				<FilesTable
					artifact={this.props.artifact}
					activeFile={this.props.activeFile}
					extendedView={this.state.extendedView}
					FilePlaylist={this.props.filePlaylist}
                    payForFileFunc={this.props.payForFileFunc}
                    buyFileFunc={this.props.buyFileFunc}
                    isPlayingFile={this.props.isPlayingFile}
                    setCurrentFile={this.props.setCurrentFile}
				/>
				<div className="" style={{width: "100%", marginTop: "-5px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}} onClick={this.toggleSeeMore}>{this.state.extendedView ? "See Less" : "See More"}</button>
				</div>
			</div>
		);
	}
}

ContentExtraInfo.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    activeFile: PropTypes.object,
    filePlaylist: PropTypes.object,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
}

export default ContentExtraInfo;
