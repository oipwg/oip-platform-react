import React, { Component } from 'react';

import Spinner from 'react-spinkit';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import TextViewer from './TextViewer.js';
import HTMLContainer from './htmlContainer.js';
import CodeContainer from './codeContainer.js';

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
		let type, loading = false;

		if (this.state.ActiveFile.info && this.state.ActiveFile.info.type){
			type = this.state.ActiveFile.info.type;
		}

		if (this.state.CurrentArtifact && this.state.CurrentArtifact.isFetching)
			loading = true;

		let _this = this;
		return (
			<div className="content-container">
				<div id='content' 
					className={ (this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid && !this.state.ActiveFile.owned) ? "content blur" : "content"} 
					style=	  { (this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid && !this.state.ActiveFile.owned) ? {display: "block"} : {display: "inline"}}
				>
					{ loading ? <div style={{height: "100%", margin: "auto"}} className="spinner-container"><Spinner name="wave" color="aqua"/></div> : ''}
					{ (type ===  'Audio' && !loading) ? <AudioContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ (type ===  'Video' && !loading) ? <VideoPlayer Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} /> : '' }
					{ (type ===  'Image' && !loading) ? <ImageContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ (type ===  'Text' && !loading) ? <TextViewer Core={this.props.Core} store={this.props.store} /> : '' }
					{ (type ===  'Web' && !loading) ? <HTMLContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ (type ===  'Software' && !loading) ? <CodeContainer Core={this.props.Core} store={this.props.store} /> : '' }
				</div>
				<Paywall Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} />
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