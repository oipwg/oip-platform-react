import React, { Component } from 'react';

class STLContainer extends Component {
	constructor(props) {
        super(props);
    }
	render() {
		let stlURL;

		if (this.props.ActiveFile && this.props.Artifact && this.props.ActiveFile.info && this.props.artifact){
			stlURL = this.props.buildIPFSURL(this.props.CurrentArtifact.artifact.getLocation(), this.state.ActiveFile.info.getFilename());
		}

		return (
			<div>
				<h1>STL CONTAINER</h1>
			</div>
		);
	}
}

STLContainer.SUPPORTED_FILE_TYPES = ["stl"];

export default STLContainer;
