import React, { Component } from 'react';

import ContentExtraInfo from './contentExtraInfo.js';

class ContentInfo extends Component {
	render() {
		let creator, title, icon, views = 123, userIcon = "https://gateway.ipfs.io/ipfs/QmWJ7RhZgktfnAeXn8SS2uahJC56gtkTmyNmycp4p2KheW/usericon_id76rb.png";

		if (this.props.artifact){
			creator = this.props.Core.Artifact.getPublisherName(this.props.artifact);
			title = this.props.Core.Artifact.getTitle(this.props.artifact);
			icon = this.props.Core.Artifact.getEntypoIconForType(this.props.Core.Artifact.getType(this.props.artifact));
		}

		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}><span className={"icon icon-" + icon} style={{marginRight:"10px"}}></span>{title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}>
							<button className="btn btn-outline-secondary">{views} Views</button>
						</div>
					</div>
				</div>
				<div className="media">
					<img className="d-flex mr-3 rounded-circle" src={userIcon} alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "15px", marginLeft: "-10px"}}>{creator} <div className="btn-group"><button className="btn btn-sm btn-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Followed</button><button className="btn btn-sm btn-outline-secondary" disabled>3,954 Followers</button></div>
							<div style={{float: "right"}}>
								<button className="btn btn-sm btn-outline-info btn-margin-right"><span className="icon-forward icon"></span> Share</button>
								<button className="btn btn-sm btn-outline-success btn-margin-right"><span className="icon-wallet icon"></span> Tip</button>
								<button className="btn btn-sm btn-outline-danger">...</button>
							</div>
						</h5>
					</div>
				</div>
				<ContentExtraInfo artifact={this.props.artifact} Core={this.props.Core} />
			</div>
		);
	}
}

export default ContentInfo;