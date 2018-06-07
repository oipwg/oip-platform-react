import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import ContentExtraInfo from './ContentExtraInfo.js';
import ShareButton from './ShareButton.js';
import TipButtons from './TipButtons.js';
import ReportButton from './ReportButton.js';

import ArtifactIcon from './ArtifactIcon.js';
import PublisherIcon from './PublisherIcon.js';

class ContentInfo extends Component {
	constructor(props){
		super(props);
	}

	render() {

    let publisher, pubName, title, icon, paid, artifact;

    if (this.props.Artifact) {
    	artifact = this.props.Artifact;
        publisher = artifact.getMainAddress();
        pubName = artifact.getPublisherName();
        title = artifact.getTitle();
        paid = artifact ? artifact.isPaid() : false;
	}

		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}>{this.props.ArtifactState.isFetching ? "" : <ArtifactIcon artifact={this.props.Artifact} />}{this.props.ArtifactState.isFetching ? "loading..." : title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}></div>
					</div>
				</div>
				<div className="media">
					<Link to={"/pub/" + publisher}>
						{this.props.ArtifactState.isFetching ? "" : <PublisherIcon id={publisher} style={{width: "50px", height: "50px"}} className="d-flex" /> }
					</Link>
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "13px", marginLeft: "10px"}}>{this.props.ArtifactState.isFetching ? "loading..." : <Link to={"/pub/" + publisher} style={{color: "#000"}}>{pubName}</Link>}
							<div style={{float: "right"}}>
								<ShareButton />
								<TipButtons artifact={this.props.Artifact}  />
								<ReportButton />
							</div>
						</h5>
					</div>
				</div>
				<ContentExtraInfo
					Artifact={this.props.Artifact}
					ArtifactState={this.props.ArtifactState}
					ActiveFile={this.props.ActiveFile}
                    FilePlaylist={this.props.FilePlaylist}
				/>
			</div>
		);
	}
}

export default ContentInfo;
