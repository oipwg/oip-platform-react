import React, { Component } from 'react';
import PropTypes from "prop-types";

class ImageContainer extends Component {
	constructor(props) {
		super(props);
	}
        //@ToDo: remove constructor if not needed
	render() {
		let hash = "";
		let preview = false;
		if (this.props.activeFile && ((this.props.activeFile.isPaid && !this.props.activeFile.hasPaid) && !this.props.activeFile.owned)){
			preview = true;
			hash = this.props.buildIPFSShortURL(this.props.artifact.getLocation(), this.props.artifact.getThumbnail().getFilename());
		} else {
			if (this.props.artifact && this.props.activeFile){
				hash = this.props.buildIPFSShortURL(this.props.artifact.getLocation(), this.props.activeFile.info.getFilename());
			}
		}

		let url = this.props.buildIPFSURL(hash);

		return (
				<div className="d-flex justify-content-center" style={{height: "100%"}}>
					<img style={{backgroundColor: "#fff", maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}} src={url} alt="Your image is supposed to be here!" />
				</div>
		);
	}
}

ImageContainer.SUPPORTED_FILE_TYPES = ["jpeg", "jpg", "gif", "png", "svg", "bmp", "ico"]
ImageContainer.propTypes = {
    artifact: PropTypes.object.isRequired,
    activeFile: PropTypes.object.isRequired,
    buildIPFSShortURL: PropTypes.func.isRequired,
    buildIPFSURL: PropTypes.func.isRequired,
};

export default ImageContainer;

