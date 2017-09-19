import React, { Component } from 'react';

import IPFS_MAIN from 'ipfs'
const ipfs = new IPFS_MAIN()

class ImageContainer extends Component {
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	constructor(props) {
		super(props);
		this.state = {src: ""};
	}
	render() {
		let thumbnailURL = this.props.Core.Artifact.getFirstImage(this.props.artifact);

		let _this = this;
		if (thumbnailURL !== ""){
			if (this.props.Core){
				this.props.Core.getThumbnailFromIPFS(thumbnailURL, function(srcData){
					try {
						_this.setState({ src: srcData });
					} catch(e) { }
				})
			}
		}

		return (
			<img src={this.props.paid ? "" : this.state.src} style={{maxWidth: "100%", height:"100%", display: "block",margin: "0 auto"}} alt="" />
		);
	}
}

export default ImageContainer;