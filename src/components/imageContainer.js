import React, { Component } from 'react';

class ImageContainer extends Component {
	componentDidMount(){
		let thumbnailURL = "";

		if (this.props.paid){
			thumbnailURL = this.props.Core.Artifact.getThumbnail(this.props.artifact);
		} else {
			thumbnailURL = this.props.Core.Artifact.getFirstImage(this.props.artifact);
		}

		let _this = this;
		if (thumbnailURL !== ""){
			if (this.props.Core){
				this.props.Core.Network.getThumbnailFromIPFS(thumbnailURL, function(srcData){
					try {
						_this.setState({ src: srcData });
					} catch(e) { }
				})
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		let thumbnailURL = "";

		if (!nextProps.paid){
			thumbnailURL = nextProps.Core.Artifact.getFirstImage(nextProps.artifact);

			let _this = this;
			if (thumbnailURL !== ""){
				if (nextProps.Core){
					nextProps.Core.Network.getThumbnailFromIPFS(thumbnailURL, function(srcData){
						try {
							_this.setState({ src: srcData });
						} catch(e) { }
					})
				}
			}
		}
	}
	constructor(props) {
		super(props);
		this.state = {src: ""};
	}
	render() {
		return (
			<img src={this.state.src} style={{maxWidth: "100%", height:"100%", display: "block",margin: "0 auto"}} alt="" />
		);
	}
}

export default ImageContainer;