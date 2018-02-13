import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import PublisherIcon from './PublisherIcon.js';
import IPFSImage from './IPFSImage.js';

import { FormattedTime } from 'react-player-controls'

class ContentCard extends Component {
	scrollToTop(){
		window.scrollTo(0, 0);
	}
	render() {
		let title = this.props.Core.Artifact.getTitle(this.props.artifact);
		let publisher = this.props.Core.Artifact.getPublisher(this.props.artifact);
		let txid = this.props.Core.Artifact.getTXID(this.props.artifact);
		let paid = this.props.Core.Artifact.paid(this.props.artifact);
		let icon = this.props.Core.Artifact.getEntypoIconForType(this.props.Core.Artifact.getType(this.props.artifact));
		let thumbnailHash = this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.props.artifact), this.props.Core.Artifact.getThumbnail(this.props.artifact));
		
		let duration = this.props.Core.Artifact.getDuration(this.props.artifact);

		let cardClasses = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 no-link-styling";

		if (this.props.size === "large")
			cardClasses = "col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12 no-link-styling";

		return (
			<Link to={"/" + txid.substring(0,6) } onClick={function(){window.scrollTo(0, 0)}} className={cardClasses} title={title} >
				<div className="card">
					<div style={{marginBottom:"-26px", marginTop: "-1px", zIndex: "1"}}>
						<button className="btn btn-outline-primary btn-white" style={{padding: "3px 5px", border: "none", backgroundColor: "rgba(0,0,0,0.5)"}}>
							{ paid ? <span className="icon icon-credit" style={{color: "rgb(63, 255, 63)"}}></span> : ''}
							<span className={"icon icon-" + icon}></span>
						</button>
					</div>
					<div className="card-img-top content-card-img">
						<img src={"http://ipfs-one.alexandria.io:9548/artifact/" + txid.substr(0,6)} alt="" style={{width: "inherit"}} />
						{/*<IPFSImage Core={this.props.Core} hash={thumbnailHash} width={"100%"} height={"100%"} cover={true} />*/}
					</div>
					{duration ? <p className="content-card-xinfo"><FormattedTime numSeconds={duration} /></p> : <div className="content-card-xinfo-offset"></div>}
					<div className="card-block" style={{padding: "10px",whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
						<strong style={{}}>{title}</strong>
						<Link to={"/pub/" + publisher } onClick={function(){window.scrollTo(0, 0)}}>
							<div style={{marginBottom: "-15px", marginTop: "5px", maxWidth: "80%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex"}}>
								<PublisherIcon id={publisher} Core={this.props.Core} style={{width: "32px", height: "32px"}} small={true} />
								<p style={{marginTop:"4px", marginLeft: "5px", display: "inline-flex", color: "#000"}}>{this.props.artifact.publisherName}</p>
							</div>
						</Link>
						{/* 0.9 Feature */}
						{/*
						<button className="btn btn-sm btn-outline-secondary view-btn">{this.props.views} Views</button>
						*/}
					</div>
				</div>
			</Link>
		);
	}
}

export default ContentCard;