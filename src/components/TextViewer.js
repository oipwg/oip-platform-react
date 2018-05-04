import React, { Component } from 'react';

import MarkdownContainer from './markdownContainer.js';
import PDFViewer from './pdfViewer.js';

class TextViewer extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

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
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let pdf = false;

		if (this.state.ActiveFile && this.state.ActiveFile.info){
			if (this.props.Core.util.getExtension(this.state.ActiveFile.info.getFilename()) === "pdf" || this.props.Core.util.getExtension(this.state.ActiveFile.info.getFilename()) === "PDF"){
				pdf = true;
			}
		}

		return (
			<div style={{height: "100%"}}>
				{pdf ? <PDFViewer store={this.props.store} Core={this.props.Core} /> : <MarkdownContainer store={this.props.store} Core={this.props.Core} />}
			</div>
		);
	}
}

export default TextViewer;