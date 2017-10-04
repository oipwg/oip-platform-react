import React, { Component } from 'react';

class ImageContainer extends Component {
	componentDidMount(){
		let thumbnailURL = "";

		if (this.props.paid){
			thumbnailURL = this.props.Core.Artifact.getThumbnail(this.props.artifact);
		} else {
			thumbnailURL = this.props.Core.Artifact.getFirstImage(this.props.artifact);
		}
		console.log(this.props.artifact)
		console.log(thumbnailURL);

		let _this = this;
		if (thumbnailURL !== ""){
			if (this.props.Core){
				this.props.Core.Network.getThumbnailFromIPFS(thumbnailURL, function(srcData){
					try {
						_this.setState({ src: srcData });
						// LivePhotosKit.Player(_this.refs.image);
					} catch(e) { }
				})
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		let thumbnailURL = "";

		if (this.props.artifact !== nextProps.artifact){
			this.setState({src: ""});
		}

		if (nextProps.paid){
			thumbnailURL = nextProps.Core.Artifact.getThumbnail(nextProps.artifact);
		} else {
			thumbnailURL = nextProps.Core.Artifact.getFirstImage(nextProps.artifact);
		}

		console.log(thumbnailURL);

		let _this = this;
		if (thumbnailURL !== ""){
			if (nextProps.Core){
				nextProps.Core.Network.getThumbnailFromIPFS(thumbnailURL, function(srcData){
					try {
						_this.setState({ src: srcData });
						// LivePhotosKit.Player(_this.refs.image);
					} catch(e) { }
				})
			}
		}
	}
	constructor(props) {
		super(props);
		this.state = {src: ""};
	}
	render() {
		return (
			<div style={{height: "100%", verticalAlign: "middle", display: "flex"}}>
				<img ref="image" src={this.state.src} style={{width: "auto", maxWidth: "100%", maxHeight:"100%", display: "block",margin: "auto", backgroundColor: "#fff"}} alt="" />
			</div>
		);
	}
}

export default ImageContainer;