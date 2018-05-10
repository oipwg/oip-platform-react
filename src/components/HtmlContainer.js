import React, { Component } from 'react';

class HTMLContainer extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

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
			this.setState(stateObj);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	render() {
		let websiteURL;

		if (this.state.ActiveFile && this.state.CurrentArtifact && this.state.ActiveFile.info && this.state.CurrentArtifact.artifact){
			// websiteURL = this.state.CurrentArtifact.artifact.getFirstHTMLURL();
			websiteURL = this.props.Core.util.buildIPFSURL(this.state.CurrentArtifact.artifact.getLocation(), this.state.ActiveFile.info.getFilename());
		}

		return (
			<iframe title="html_doc" style={{width:"inherit", height:"100%", overflow: "hidden", backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.2)"}} frameBorder="0" src={websiteURL}></iframe>
		);
	}
}

HTMLContainer.SUPPORTED_FILE_TYPES = ["html"];

export default HTMLContainer;
