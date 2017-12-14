import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

class PublisherBlock extends Component {
	componentDidMount(){
		let thumbnail = this.props.Core.Artifact.getThumbnail(this.props.artifact);

		if (thumbnail){
			if (this.props.Core){
				this.updateSrc = true;
				let ipfsShortURL = this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.props.artifact), thumbnail);
				this.props.Core.Network.getThumbnailFromIPFS(ipfsShortURL, this.updateSrcCallback)
			}
		}
	}
	componentWillUnmount() {
		this.updateSrc = false;
	}
	constructor(props) {
		
	}
	updateSrcCallback(srcData){
		if (this.updateSrc){
			this.setState({ src: srcData });
		}
	}
	scrollToTop(){
		window.scrollTo(0, 0);
	}
	render() {
		let title = this.props.Core.Artifact.getTitle(this.props.artifact);
		let txid = this.props.Core.Artifact.getTXID(this.props.artifact);
		let paid = this.props.Core.Artifact.paid(this.props.artifact);
		let icon = this.props.Core.Artifact.getEntypoIconForType(this.props.Core.Artifact.getType(this.props.artifact));
		
		let duration = this.props.Core.Artifact.getDuration(this.props.artifact);

		let userIcon = "https://gateway.ipfs.io/ipfs/QmWJ7RhZgktfnAeXn8SS2uahJC56gtkTmyNmycp4p2KheW/usericon_id76rb.png";

		let cardClasses = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 no-link-styling";

		if (this.props.size === "large")
			cardClasses = "col-xl-4 col-lg-5 col-md-6 col-sm-12 col-12 no-link-styling"

		return (
			<Link to={"/" + txid.substring(0,6) } onClick={function(){window.scrollTo(0, 0)}} className={cardClasses}>
				<div className="card">
					<img className="card-img-top content-card-img" src={this.state.src ? this.state.src : this.state.backupSrc} alt="" />
					<div style={{marginBottom:"115px", marginTop: "-145px"}}>
						<button className="btn btn-outline-primary btn-white" style={{padding: "3px 5px", border: "none", backgroundColor: "rgba(0,0,0,0.5)"}}>
							{ paid ? <span className="icon icon-credit" style={{color: "rgb(63, 255, 63)"}}></span> : ''}
							<span className={"icon icon-" + icon}></span>
						</button>
					</div>
					{duration ? <p className="content-card-xinfo">{duration}</p> : <div className="content-card-xinfo-offset"></div>}
					<div className="card-block" style={{padding: "10px",whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
						<strong style={{}}>{title}</strong>
						<p style={{marginBottom: "-10px", maxWidth: "80%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}><img className="rounded-circle" src={userIcon} width="30" height="30" alt="" style={{marginRight: "3px", marginBottom: "3px"}} /><span style={{paddingTop:"10px"}}>{this.props.artifact.publisherName}</span></p>
						<button className="btn btn-sm btn-outline-secondary view-btn">{this.props.views} Views</button>
					</div>
				</div>
			</Link>
		);
	}
}

export default PublisherBlock;