import React, { Component } from 'react';

class HTMLContainer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let websiteURL;

		if (this.props.ActiveFile && this.props.Artifact && this.props.ActiveFile.info){
			websiteURL = this.props.buildIPFSURL(this.props.Artifact.getLocation(), this.props.ActiveFile.info.getFilename());
		}
		return (
			<iframe title="html_doc" style={{width:"inherit", height:"100%", overflow: "hidden", backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.2)"}} frameBorder="0" src={websiteURL}></iframe>
		);
	}
}

HTMLContainer.SUPPORTED_FILE_TYPES = ["html"];

export default HTMLContainer;
