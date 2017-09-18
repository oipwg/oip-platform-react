import React, { Component } from 'react';

class PDFViewer extends Component {
	render() {
		let pdf;

		let files = this.props.artifact['oip-041'].artifact.storage.files;
		let mainHash = this.props.artifact['oip-041'].artifact.storage.location;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Text" && !pdf)
				pdf = files[i];
		}

		let pdfURL = "";

		if (pdf){
			pdfURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + encodeURIComponent(pdf.fname);
		}

		return (
			<iframe title="pdf" style={{width:"100%", height:"100%", overflow: "hidden"}} frameBorder="0" src={"/assets/other/ViewerJS/#" + pdfURL}></iframe>
		);
	}
}

export default PDFViewer;