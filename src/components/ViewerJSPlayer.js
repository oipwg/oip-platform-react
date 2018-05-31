import React, { Component } from 'react';

class ViewerJSPlayer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let pdfURL;

		if (this.props.ActiveFile && this.props.Artifact && this.props.ActiveFile.info && this.props.Artifact){
			pdfURL = this.props.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.Artifact.getLocation(), this.state.ActiveFile.info));
		}
		return (
			<iframe title="pdf" style={{width:"100vw", height:"100%", overflow: "hidden"}} frameBorder="0" src={"http://viewerjs.org/ViewerJS/#" + pdfURL}></iframe>
		);
	}
}

ViewerJSPlayer.SUPPORTED_FILE_TYPES = ["pdf", "odt", "odp", "ods"]

export default ViewerJSPlayer;
