import React, { Component } from 'react';
import IPFSImage from './IPFSImage.js';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let hash = "";
		let preview = false;

		if (this.props.ActiveFile && ((this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid) && !this.props.ActiveFile.owned)){
			preview = true;

			hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.Artifact.getThumbnail());
		} else {
			if (this.props.Artifact && this.props.ActiveFile){
				hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.ActiveFile.info);
			}
		}

		return (
			<div className="align-middle" style={{height: "100%", width: "100vw", verticalAlign: "middle"}}>
				<div className="img-container" style={{height: "inherit", width: "auto", maxWidth: "100%", display: "block",margin: "auto"}}>
					<IPFSImage Core={this.props.Core} hash={hash} width={preview ? "100%" : ""} cover={preview} />
				</div>
			</div>
		);
	}
}

ImageContainer.SUPPORTED_FILE_TYPES = ["jpeg", "jpg", "gif", "png", "svg", "bmp", "ico"]

export default ImageContainer;
