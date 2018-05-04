import React, { Component } from 'react';

import STLViewer from 'stl-viewer';

class STLContainer extends Component {
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
		let stlURL;

		if (this.state.ActiveFile && this.state.CurrentArtifact && this.state.ActiveFile.info && this.state.CurrentArtifact.artifact){
			stlURL = this.props.Core.util.buildIPFSURL(this.state.CurrentArtifact.artifact.getLocation(), this.state.ActiveFile.info.getFilename());
		}

		return (
			<div style={{width: "inherit", height: "100%", borderBottom: "1px solid rgba(0,0,0,0.2)"}}>
				<STLViewer
					url={stlURL}
					width={1000}
					height={600}
					modelColor='#B92C2C'
					backgroundColor='#EAEAEA'
					rotate={true}
					orbitControls={true}
					style={{margin: "auto auto"}}
				/>
			</div>
		);
	}
}

STLContainer.SUPPORTED_FILE_TYPES = ["stl"];

export default STLContainer;
