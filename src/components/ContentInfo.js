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
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}>{this.props.ArtifactState.isFetching ? "" : <ArtifactIcon artifact={this.props.artifact} />}{this.props.artifactState.isFetching ? "loading..." : title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}></div>
					</div>
				</div>
				<div className="media">
					<Link to={"/pub/" + publisher}>
						{this.props.artifactState.isFetching ? "" : <PublisherIcon id={publisher} style={{width: "50px", height: "50px"}} className="d-flex" /> }
					</Link>
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "13px", marginLeft: "10px"}}>{this.props.artifactState.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}
							<div style={{float: "right"}}>
								<ShareButton />
								<TipButtons artifact={this.props.artifact}  />
								<ReportButton />
							</div>
						</h5>
					</div>
				</div>
				<ContentExtraInfo
					Artifact={this.props.artifact}
					ArtifactState={this.props.artifactState}
					ActiveFile={this.props.activeFile}
                    FilePlaylist={this.props.filePlaylist}
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
    artifact: PropTypes.object.isRequired,
    artifactState: PropTypes.object.isRequired,
    activeFile: PropTypes.object.isRequired,
    filePlaylist: PropTypes.object.isRequired,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
}

export default ContentInfo;
