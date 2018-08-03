import React, { Component } from 'react';
import PropTypes from "prop-types";

class HTMLContainer extends Component {
	render() {
		let websiteURL;

		if (this.props.activeFile && this.props.artifact && this.props.activeFile.info){
			websiteURL = this.props.buildIPFSURL(this.props.artifact.getLocation(), this.props.activeFile.info.getFilename());
		}
		return (
			<iframe title="html_doc" style={{width:"inherit", height:"100%", overflow: "hidden", backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.2)"}} frameBorder="0" src={websiteURL}></iframe>
		);
	}
}

HTMLContainer.SUPPORTED_FILE_TYPES = ["html"];
HTMLContainer.propTypes = {
    artifact: PropTypes.object.isRequired,
    activeFile: PropTypes.object.isRequired,
    buildIPFSShortURL: PropTypes.func.isRequired,
    buildIPFSURL: PropTypes.func.isRequired,
};

export default HTMLContainer;
