import React, { Component } from 'react';

import ContentExtraInfo from './contentExtraInfo.js';
import ShareButton from './ShareButton.js';
import TipButton from './TipButton.js';
import ReportButton from './ReportButton.js';

import Identicons from 'identicons-react';

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
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact.artifact;

		if (currentArtifact && this.state !== currentArtifact){
			this.setState({ Artifact: currentArtifact });
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
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
		let creator = this.props.Core.Artifact.getPublisherName(this.state.Artifact);
		let title = this.props.Core.Artifact.getTitle(this.state.Artifact);
		let icon = this.props.Core.Artifact.getEntypoIconForType(this.props.Core.Artifact.getType(this.state.Artifact));

		return (
			<div>
				<div className="row">
					<div className="col-10">
						<h3 style={{paddingLeft: "20px", wordWrap: "break-word"}}><span className={"icon icon-" + icon} style={{marginRight:"10px"}}></span>{title}</h3>
					</div>
					<div className="col-2">
						<div style={{float: "right", marginTop: "2px"}}>
							{/* 0.9 Feature */}
							{/*
							<button className="btn btn-outline-secondary">{this.state.views} Views</button>
							*/}
						</div>
					</div>
				</div>
				<div className="media">
					<div className="d-flex mr-3 rounded-circle" style={{width: "50px", height: "50px"}}>
						<Identicons id={creator} width={48} size={5} />
					</div>
					<div className="media-body">
						<h5 className="mt-0" style={{paddingTop: "10px", marginLeft: "-10px"}}>{creator} 
							{/* 0.9 Feature */}
							{/*
							<div className="btn-group">
								<button className="btn btn-sm btn-outline-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Follow</button>
								<button className="btn btn-sm btn-outline-secondary" disabled>10 Followers</button>
							</div>
							*/}
							<div style={{float: "right"}}>
								<ShareButton />
								<TipButton />
								<ReportButton />
							</div>
						</h5>
					</div>
				</div>
				<ContentExtraInfo Core={this.props.Core} store={this.props.store} />
			</div>
		);
	}
}

export default ContentInfo;