import React, { Component } from 'react';

class STLContainer extends Component {
	render() {
		let stlURL;

		if (this.props.activeFile && this.props.artifact && this.props.activeFile.info){
			// stlURL = this.props.buildIPFSURL(this.props.artifact.getLocation(), this.state.activeFile.info.getFilename());
		}

		return (
			<div>
				<h1>STL CONTAINER</h1>
			</div>
		);
	}
}

STLContainer.SUPPORTED_FILE_TYPES = ["stl"];
//@ToDo: build STLContainer and add prop-types

export default STLContainer;
