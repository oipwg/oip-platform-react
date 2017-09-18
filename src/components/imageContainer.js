import React, { Component } from 'react';

import IPFS_MAIN from 'ipfs'
const ipfs = new IPFS_MAIN()

class ImageContainer extends Component {
	componentDidMount(){
		let thumbnail;

		let files = this.props.artifact['oip-041'].artifact.storage.files;
		let mainHash = this.props.artifact['oip-041'].artifact.storage.location;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Image" && !thumbnail)
				thumbnail = files[i];
		}

		let thumbnailURL = "";

		if (thumbnail){
			thumbnailURL = mainHash + "/" + thumbnail.fname;
		}

		if (thumbnailURL === ""){
			thumbnailURL = "QmQhoySfbL9j4jbDRSsZaeu3DACVBYW1o9vgs8aZAc5bLP/alexandria-default-posterframe.png";
		}

		let _this = this;

		ipfs.files.cat(thumbnailURL, function (err, file) {
			let stream = file;
			let chunks = [];
			if (stream){
				stream.on('data', function(chunk) {
					chunks.push(chunk);

					var reader  = new FileReader();

					reader.addEventListener("load", function () {
						if (reader.result && reader.result != "data:")
							_this.setState({ src: reader.result });
					}, false);

					if (chunks) {
						reader.readAsDataURL(new Blob(chunks));
					}
				});
			}
				
		})
	}
	componentWillUnmount() {
		if (this.serverRequest){
			try {
				this.serverRequest.abort();
			} catch(e){}
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