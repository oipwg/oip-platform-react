import React, { Component } from 'react';

class PDFViewer extends Component {
	render() {
		return (
			<iframe title="pdf" style={{width:"100%", height:"100%", overflow: "hidden"}} frameBorder="0" src={"/assets/other/ViewerJS/#" + this.props.url}></iframe>
		);
	}
}

export default PDFViewer;