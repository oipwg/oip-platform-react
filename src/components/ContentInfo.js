import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import moment from "moment/moment";

import ContentExtraInfo from './ContentExtraInfo.js';
import ShareButton from './ShareButton.js';
import TipButtons from './TipButtons.js';
import ReportButton from './ReportButton.js';
import PublisherIcon from './PublisherIcon.js';

class ContentInfo extends Component {
	render() {
    let publisher, pubName, title, artifact, niceTime, description;

    if (this.props.artifact) {
    	artifact = this.props.artifact;
        publisher = artifact.getMainAddress();
        pubName = artifact.getPublisherName();
        title = artifact.getTitle();
        niceTime = moment(artifact.getTimestamp() * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});
        description = artifact.getDescription();
        // paid = artifact ? artifact.isPaid() : false; declare above ^ let...
        //                            {this.props.artifactState.isFetching ? "" : <ArtifactIcon artifact={this.props.artifact} />}
	}

		return (
			<div className="content-info-container">
				<div className="row" style={{wordWrap: "break-word"}}>
                    <div className="pub-icon col-1 d-flex justify-content-center">
                        <Link to={"/pub/" + publisher}>
                            {this.props.artifactState.isFetching ? "" : <PublisherIcon id={publisher} /> }
                        </Link>
                    </div>
                    <div className="content-title order last col d-flex justify-content-start align-items-center">
                        <h5 className="m-0">{this.props.artifactState.isFetching ? "loading..." : title}</h5>
                    </div>
                    <div className="publisher-buttons col-12 d-flex justify-content-end align-items-center">
                        <ShareButton />
                        <TipButtons artifact={this.props.artifact}  />
                        <ReportButton />
                    </div>
				</div>

                <div className="publisher-body row">
                    <div className="col-1 d-flex"/>
                    <div className="pub-name d-flex col justify-content-start align-items-center">
                        {this.props.artifactState.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}
                    </div>
                </div>

				<ContentExtraInfo
					artifact={this.props.artifact}
					artifactState={this.props.artifactState}
					activeFile={this.props.activeFile}
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

ContentInfo.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    activeFile: PropTypes.object,
    filePlaylist: PropTypes.object,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
}

export default ContentInfo;
