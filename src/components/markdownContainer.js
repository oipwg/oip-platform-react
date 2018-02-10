import React, { Component } from 'react';
import axios from 'axios';

var ReactMarkdown = require('react-markdown');

class MarkdownContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			markdown: ""
		}

		this.getMarkdown = this.getMarkdown.bind(this);
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
			let getMarkdown = this.getMarkdown;
			this.setState(stateObj, () => {
				getMarkdown();
			});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();

		if (this.serverRequest){
			try {
				this.serverRequest.abort();
			} catch(e){}
		}
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	getMarkdown(){
		if (this.state.ActiveFile && this.state.CurrentArtifact && this.state.ActiveFile.info && this.state.CurrentArtifact.artifact){
			let markdownURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.state.ActiveFile.info));
			
			let _this = this;

			this.serverRequest = axios
			.get(markdownURL)
			.then(function(result) {    
				_this.setState({
					markdown: result.data
				});
			});
		}
	}
	render() {
		return (
			<div className="justify-content-center markdownContainer" style={{height: "100%", margin: "0px auto"}}>
				<ReactMarkdown source={this.state.markdown} />
			</div>
		);
	}
}

MarkdownContainer.SUPPORTED_FILE_TYPES = ["md", "txt"]

export default MarkdownContainer;