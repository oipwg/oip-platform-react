import React, { Component } from 'react';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let hash = "";
		let preview = false;
		console.log("HASH ONE ", hash)
		if (this.props.ActiveFile && ((this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid) && !this.props.ActiveFile.owned)){
			preview = true;
			//.getThumbnail returns undefined because no subType: Image
			hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.Artifact.getThumbnail().getFilename());
		} else {
			if (this.props.Artifact && this.props.ActiveFile){
				hash = this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.ActiveFile.info.getFilename());
			}
		}

		let url = this.props.buildIPFSURL(hash);

		return (
			<div className="align-middle" style={{height: "100%", width: "100vw", verticalAlign: "middle"}}>
				<div className="img-container" style={{height: "inherit", width: "auto", maxWidth: "100%", display: "block",margin: "auto"}}>
					{/*<IPFSImage hash={hash} cover={preview} width={preview ? "100%" : ""} />*/}
                    <img src={url} alt={"Your image is supposed to be here!"}/>
				</div>
			</div>
		);
	}
}

ImageContainer.SUPPORTED_FILE_TYPES = ["jpeg", "jpg", "gif", "png", "svg", "bmp", "ico"]

export default ImageContainer;
