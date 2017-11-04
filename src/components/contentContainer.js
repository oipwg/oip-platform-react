import React, { Component } from 'react';

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

		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let active = newState.FilePlaylist.active;
		let currentFile = newState.FilePlaylist[active];

		if (currentFile && this.state !== currentFile){
			this.setState(currentFile);
			console.log(this.state);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let type;

		if (this.state.info && this.state.info.type){
			type = this.state.info.type;
		}

		let _this = this;
		return (
			<div className="content-container">
				<div id='content' 
					className={ (this.state.isPaid && !this.state.hasPaid && !this.state.owned) ? "content blur" : "content"} 
					style=	  { (this.state.isPaid && !this.state.hasPaid && !this.state.owned) ? {display: "block"} : {display: "inline"}}
				>
					{ type ===  'Audio' ? <AudioContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ type ===  'Video' ? <VideoPlayer Core={this.props.Core} store={this.props.store} /> : '' }
					{ type ===  'Image' ? <ImageContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ type ===  'Text' ? <TextViewer Core={this.props.Core} store={this.props.store} /> : '' }
					{ type ===  'Web' ? <HTMLContainer Core={this.props.Core} store={this.props.store} /> : '' }
					{ type ===  'Software' ? <CodeContainer Core={this.props.Core} store={this.props.store} /> : '' }
				</div>
				<Paywall Core={this.props.Core} store={this.props.store} />
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