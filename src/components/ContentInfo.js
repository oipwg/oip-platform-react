import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import ContentExtraInfo from './ContentExtraInfo.js';
import ShareButton from './ShareButton.js';
import TipButtons from './TipButtons.js';
import ReportButton from './ReportButton.js';

import ArtifactIcon from './ArtifactIcon.js';
import PublisherIcon from './PublisherIcon.js';

class ContentInfo extends Component {
	render() {
    let publisher, pubName, title, artifact;

    if (this.props.artifact) {
    	artifact = this.props.artifact;
        publisher = artifact.getMainAddress();
        pubName = artifact.getPublisherName();
        title = artifact.getTitle();
        // paid = artifact ? artifact.isPaid() : false; declare above ^ let...
	}

		return (
			<div className="content-info-container">
				<div className="row" style={{wordWrap: "break-word"}}>
                    <div className="artifact-icon-title col d-flex">
                        <h3 className="d-flex">
                            {this.props.artifactState.isFetching ? "" : <ArtifactIcon artifact={this.props.artifact} />}
                            <span className="mx-2"/>
                            {this.props.artifactState.isFetching ? "loading..." : title}
                         </h3>
                    </div>
				</div>

                <div className="publisher-body row">
                    <div className="publisher-title col-1">
                        <Link to={"/pub/" + publisher}>
                            {this.props.artifactState.isFetching ? "" : <PublisherIcon maxHeight={"30px"} id={publisher} /> }
                        </Link>
                    </div>
                    <h5 className="publisher-name col-5 mt-0">{this.props.artifactState.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}</h5>
                    <div className="publisher-buttons col-6" style={{float: "right"}}>
                        <ShareButton />
                        <TipButtons artifact={this.props.artifact}  />
                        <ReportButton />
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
