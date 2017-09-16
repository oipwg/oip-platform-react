import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

class ContentCard extends Component {
	render() {
		let paid = false;

		let thumbnail;

		let txid = this.props.artifact.txid;
		let title = this.props.artifact['oip-041'].artifact.info.title;
		let type = this.props.artifact['oip-041'].artifact.type.split('-')[0];
		let subtype = this.props.artifact['oip-041'].artifact.type.split('-')[1];
		let files = this.props.artifact['oip-041'].artifact.storage.files;
		let mainHash = this.props.artifact['oip-041'].artifact.storage.location;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Image" && !thumbnail)
				thumbnail = files[i];
		}

		let thumbnailURL = "";

		if (thumbnail){
			thumbnailURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + thumbnail.fname;
		}

		let icon;

		switch(type){
			case "Audio":
				icon = "beamed-note";
				break;
			case "Video":
				icon = "clapperboard";
				break;
			case "Image":
				icon = "image";
				break;
			case "Text":
				icon = "text";
				break;
			case "Software":
				icon = "code";
				break;
			case "Web":
				icon = "code";
				break;
			default:
				icon = "";
				break;
		}

		let userIcon = "https://gateway.ipfs.io/ipfs/QmWJ7RhZgktfnAeXn8SS2uahJC56gtkTmyNmycp4p2KheW/usericon_id76rb.png";

		return (
			<Link to={"/" + txid.substring(0,6) } className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 no-link-styling">
				<div className="card">
					<div style={{marginBottom:"-30px"}}>
						<button className="btn btn-outline-primary btn-white" style={{padding: "3px 5px"}}>
							{ this.props.paid ? <span className="icon icon-credit" style={{color: "#5cb85c"}}></span> : ''}
							<span className={"icon icon-" + icon}></span>
						</button>
					</div>
					<img className="card-img-top content-card-img" src={thumbnailURL} alt="" />
					{this.props.length ? <p className="content-card-xinfo">{this.props.length}</p> : <div className="content-card-xinfo-offset"></div>}
					<div className="card-block" style={{padding: "10px",whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
						<strong style={{}}>{title}</strong>
						<p style={{marginBottom: "-10px"}}><img className="rounded-circle" src={userIcon} width="30" height="30" alt="" style={{marginRight: "3px", marginBottom: "3px", marginLeft:"-5px"}} /><span style={{paddingTop:"10px"}}>{this.props.artifact.publisherName}</span></p>
						<button className="btn btn-sm btn-outline-secondary view-btn">{this.props.views} Views</button>
					</div>
				</div>
			</Link>
		);
	}
}

export default ContentCard;