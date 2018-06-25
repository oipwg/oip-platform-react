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

		this.toggleSeeMore = this.toggleSeeMore.bind(this);
	}

	toggleSeeMore(){
		this.setState({ extendedView: !this.state.extendedView })
	}
	render() {
		return (
			<div className="row no-gutters w-100">
                <div className="mb-3" style={{width: "100%", marginTop: "-5px"}}>
                    <hr style={{marginTop: "25px", marginBottom: "-15px"}} />
                    <button className="btn btn-sm btn-dark mx-auto" style={{display:"block"}} onClick={this.toggleSeeMore}>{this.state.extendedView ? "See Less" : "See More"}</button>
                </div>
				<FilesTable
					artifact={this.props.artifact}
					activeFile={this.props.activeFile}
					extendedView={this.state.extendedView}
                    filePlaylist={this.props.filePlaylist}
                    payForFileFunc={this.props.payForFileFunc}
                    buyFileFunc={this.props.buyFileFunc}
                    isPlayingFile={this.props.isPlayingFile}
                    setCurrentFile={this.props.setCurrentFile}
				/>
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
