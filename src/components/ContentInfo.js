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
                <div className="row no-gutters">

                    <div className="col-sm-6 col-12 order-2 mt-2 mt-sm-0"><h4 className="m-0">{this.props.artifactState.isFetching ? "loading..." : title}</h4></div>
                    <div className="publisher-social-buttons col-sm-6 col-12 d-flex justify-content-end order-1 order-sm-2">
                        <ShareButton />
                        <TipButtons artifact={this.props.artifact}  />
                        <ReportButton />
                    </div>
                    <div className="row no-gutters w-100 order-3">
                        <div className="pub-content-info">
                            <span className="font-weight-light text-muted" style={{fontSize: "13px"}}>Published on {niceTime}</span>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters mt-3">
                    <div className="d-flex" style={{width: "116px"}}>
                        <Link className="w-100" to={"/pub/" + publisher}>
                            {this.props.artifactState.isFetching ? "" : <PublisherIcon maxHeight={"40px"} maxWidth={"100%"} id={publisher} /> }
                        </Link>
                        <div className="ml-2 font-weight-light">
                            {this.props.artifactState.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}
                        </div>
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
