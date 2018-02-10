import React, { Component } from 'react';
import IPFSImage from './IPFSImage.js';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let updateState = this.stateDidUpdate;

		this.unsubscribe = this.props.store.subscribe(() => {
			updateState();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact, active, activeFile;

		if (newState.CurrentArtifact)
			currentArtifact = newState.CurrentArtifact;
		if (newState.FilePlaylist){
			active = newState.FilePlaylist.active;
			activeFile = newState.FilePlaylist[active];
		}

		let stateObj = {
			CurrentArtifact: currentArtifact,
			ActiveFile: activeFile
		}

		if (stateObj && this.state !== stateObj){
			this.setState(stateObj, () => {
				
			});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	render() {
		let hash = "";
		let preview = false;

		if (this.state.ActiveFile && ((this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid) && !this.state.ActiveFile.owned) && this.props.Core){
			preview = true;

			hash = this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.props.Core.Artifact.getThumbnail(this.state.CurrentArtifact.artifact));
		} else {
			if (this.state.CurrentArtifact && this.state.ActiveFile){
				hash = this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.state.ActiveFile.info);
			}
		}

		return (
			<div className="align-middle" style={{height: "100%", width: "100vw", verticalAlign: "middle"}}>
				<div className="img-container" style={{height: "inherit", width: "auto", maxWidth: "100%", display: "block",margin: "auto"}}>
					<IPFSImage Core={this.props.Core} hash={hash} width={preview ? "100%" : ""} cover={preview} />
				</div>
			</div>
		);
	}
}

ImageContainer.SUPPORTED_FILE_TYPES = ["jpeg", "jpg", "gif", "png", "svg", "bmp", "ico"]

export default ImageContainer;