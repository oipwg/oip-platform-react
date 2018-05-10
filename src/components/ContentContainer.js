import React, { Component } from 'react';

import Spinner from 'react-spinkit';

import FileViewer from './FileViewer.js';

import Paywall from './Paywall.js';

class ContentContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			ActiveFile: {}
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let currentFile = newState.FilePlaylist[active];

		if (currentFile && this.state !== currentFile){
			this.setState({CurrentArtifact: CurrentArtifact, ActiveFile: currentFile});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let type, loading = false, haveLoadedState = false;

		if (this.state.ActiveFile.info && this.state.ActiveFile.info.type){
			haveLoadedState = true;
			type = this.state.ActiveFile.info.type;
		}

		if (this.state.CurrentArtifact && this.state.CurrentArtifact.isFetching)
			loading = true;

		return (
			<div className="content-container">
				<div id='content' ref={content => this.content = content}
					className={ (this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid && !this.state.ActiveFile.owned) ? "content blur" : "content"} 
					style=	  { (this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid && !this.state.ActiveFile.owned) ? {overflow: "scroll"} : {}}
				>
					{ (!haveLoadedState || loading) ? <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}} className="spinner-container"><Spinner name="wave" color="aqua" /></div> : ''}
					<FileViewer Core={this.props.Core} store={this.props.store} />
				</div>
				<Paywall Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} contentRef={this.content} NotificationSystem={this.props.NotificationSystem} />
			</div>
		);
	}
}

/*
<div className="col-5">
	<button className="btn btn-outline-success" style={{float:"right", marginLeft: "25px", marginRight: "-25px", padding: "5px"}} onclick="unlockContent()"><span className="icon icon-wallet"	style={{marginRight: "5px"}}></span>Pay 3 bits</button>
</div>
<div className="col-2" style={{paddingTop: "5px"}}>
	or
</div>
<div className="col-5">
	<button className="btn btn-outline-danger" style={{float:"left", marginRight: "25px", marginLeft: "-25px", padding: "5px"}}><span className="icon icon-controller-play" style={{marginRight: "0px"}}></span>Watch an Ad</button>
</div>
*/

export default ContentContainer;