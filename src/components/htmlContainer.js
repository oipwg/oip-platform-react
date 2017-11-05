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
			websiteURL = this.props.Core.Artifact.getFirstHTMLURL(this.state.CurrentArtifact.artifact);
		}

		return (
			<iframe title="html_doc" style={{width:"100%", height:"100%", overflow: "hidden"}} frameBorder="0" src={websiteURL}></iframe>
		);
	}
}

export default HTMLContainer;