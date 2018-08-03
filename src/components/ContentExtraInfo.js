import React, { Component } from 'react';
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
                <div className="my-3" style={{width: "100%", marginTop: "-5px"}}>
                    <hr style={{marginTop: "25px", marginBottom: "-15px"}} />
                    <button className="btn btn-sm btn-dark mx-auto" style={{display:"block"}} onClick={this.toggleSeeMore}>{this.state.extendedView ? "See Less" : "See More"}</button>
                </div>
				<FilesTable
					artifact={this.props.artifact}
					activeFile={this.props.activeFile}
					extendedView={this.state.extendedView}
                    filePlaylist={this.props.filePlaylist}
                    isPlayingFile={this.props.isPlayingFile}
                    setCurrentFile={this.props.setCurrentFile}
                    buyInProgress={this.props.buyInProgress}
                    buyError={this.props.buyError}
                    paymentError={this.props.paymentError}
                    paymentInProgress={this.props.paymentInProgress}
                    payForFile={this.props.payForFile}
                    buyFile={this.props.buyFile}
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
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
    buyFile: PropTypes.func
}

export default ContentExtraInfo;
