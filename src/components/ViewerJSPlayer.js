import React, { Component } from 'react';
import PropTypes from "prop-types";

class ViewerJSPlayer extends Component {
	render() {
		let pdfURL;

		if (this.props.activeFile && this.props.artifact && this.props.activeFile.info && this.props.artifact){
			pdfURL = this.props.buildIPFSURL(this.props.buildIPFSShortURL(this.props.artifact.getLocation(), this.props.activeFile.info.getFilename()));
		}
		return (
			<iframe title="pdf" style={{width:"100vw", height:"100%", overflow: "hidden"}} frameBorder="0" src={"http://viewerjs.org/ViewerJS/#" + pdfURL}></iframe>
		);
	}
}

ViewerJSPlayer.SUPPORTED_FILE_TYPES = ["pdf", "odt", "odp", "ods"]
ViewerJSPlayer.propTypes = {
    artifact: PropTypes.object.isRequired,
    activeFile: PropTypes.object.isRequired,
    buildIPFSShortURL: PropTypes.func.isRequired,
    buildIPFSURL: PropTypes.func.isRequired,
};

export default ViewerJSPlayer;
