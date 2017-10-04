import React, { Component } from 'react';

import ContentExtraInfo from './contentExtraInfo.js';

class ContentInfo extends Component {
	constructor(props){
		super(props);

		this.state = {
			creator: "",
			title: "",
			icon: "",
			views: 123,
			profilePicture: "https://gateway.ipfs.io/ipfs/QmWJ7RhZgktfnAeXn8SS2uahJC56gtkTmyNmycp4p2KheW/usericon_id76rb.png" 
		}

		this.updateState = this.updateState.bind(this);
	}
	componentDidMount(){
		this.updateState(this.props);
	}
	componentWillUpdate(nextProps){
		if (this.props.artifact !== nextProps.artifact){
			this.updateState(nextProps);
		}	
	}
	updateState(props){
		let creator = props.Core.Artifact.getPublisherName(props.artifact);
		let title = props.Core.Artifact.getTitle(props.artifact);
		let icon = props.Core.Artifact.getEntypoIconForType(props.Core.Artifact.getType(props.artifact));

		this.setState({creator: creator, title: title, icon: icon});
	}
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}><span className={"icon icon-" + this.state.icon} style={{marginRight:"10px"}}></span>{this.state.title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}>
							<button className="btn btn-outline-secondary">{this.state.views} Views</button>
						</div>
					</div>
				</div>
				<div className="media">
					<img className="d-flex mr-3 rounded-circle" src={this.state.profilePicture} alt="" style={{width: "50px", height: "50px"}} />
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "15px", marginLeft: "-10px"}}>{this.state.creator} <div className="btn-group"><button className="btn btn-sm btn-outline-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Follow</button><button className="btn btn-sm btn-outline-secondary" disabled>10 Followers</button></div>
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