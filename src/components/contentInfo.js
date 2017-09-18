import React, { Component } from 'react';

class ContentInfo extends Component {
	render() {
		let thumbnail, creator, title, description = "", type, subtype, files, mainHash;

		if (this.props.artifact){
			creator = this.props.artifact.publisherName;
			title = this.props.artifact['oip-041'].artifact.info.title;
			description = this.props.artifact['oip-041'].artifact.info.description;
			type = this.props.artifact['oip-041'].artifact.type.split('-')[0];
			subtype = this.props.artifact['oip-041'].artifact.type.split('-')[1];
			files = this.props.artifact['oip-041'].artifact.storage.files;
			mainHash = this.props.artifact['oip-041'].artifact.storage.location;
		}
		
		let views = 123;

		let paid = false;
		if (files){
			for (var i = 0; i < files.length; i++){
				if (files[i].sugPlay || files[i].sugBuy)
					paid = true;
				
				if (files[i].type === "Image" && !thumbnail)
					thumbnail = files[i];
			}
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
				<p style={{textIndent: "40px", marginTop: "10px"}}>{description.length > 350 ? description.substring(0,350) + "..." : description}</p>
				<div className="" style={{width: "100%", marginTop: "-5px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}}>See More</button>
				</div>
			</div>
		);
	}
}

export default ContentInfo;