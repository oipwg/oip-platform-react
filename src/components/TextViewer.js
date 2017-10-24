import React, { Component } from 'react';

import MarkdownContainer from './markdownContainer.js';
import PDFViewer from './pdfViewer.js';

class TextViewer extends Component {
	render() {
		let pdf = false;

		let files = this.props.artifact['oip-041'].artifact.storage.files;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Text" && (this.props.Core.util.getExtension(files[i].fname) === "pdf" || this.props.Core.util.getExtension(files[i].fname) === "PDF"))
				pdf = true;
		}

		return (
			<div style={{height: "100%"}}>
				{pdf ? <PDFViewer artifact={this.props.artifact} /> : <MarkdownContainer artifact={this.props.artifact} />}
			</div>
		);
	}
}

export default TextViewer;