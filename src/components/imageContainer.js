import React, { Component } from 'react';

class ImageContainer extends Component {
	componentDidMount(){
		let mainFile;

		if (this.props.paid){
			mainFile = this.props.Core.Artifact.getThumbnail(this.props.artifact);
		} else {
			mainFile = this.props.Core.Artifact.getFirstImage(this.props.artifact);
		}

		this.props.setCurrentFile(mainFile);

		this.loadIntoImage(this.props.artifact, this.props.CurrentFile);
		// let _this = this;
		// if (thumbnailURL !== ""){
		// 	if (this.props.Core){
		// 		this.props.Core.Network.getThumbnailFromIPFS(thumbnailURL, function(srcData){
		// 			try {
		// 				_this.setState({ src: srcData });
		// 				// LivePhotosKit.Player(_this.refs.image);
		// 			} catch(e) { }
		// 		})
		// 	}
		// }
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps.ArtifactManager.currentFile);
		let mainFile;

		if (this.props.artifact !== nextProps.artifact){
			this.setState({src: ""});
		}

		if (nextProps.CurrentFile){
			console.log(nextProps.CurrentFile);
			this.loadIntoImage(nextProps.artifact, nextProps.CurrentFile);
		} else {
			if (nextProps.paid){
				mainFile = nextProps.Core.Artifact.getThumbnail(nextProps.artifact);
			} else {
				mainFile = nextProps.Core.Artifact.getFirstImage(nextProps.artifact);
			}

			this.loadIntoImage(nextProps.artifact, mainFile);
		}
	}
	constructor(props) {
		super(props);
		this.state = {src: ""};

		this.loadIntoImage = this.loadIntoImage.bind(this);
	}
	loadIntoImage(artifact, file){
		if (artifact && file){
			let ipfsShortURL = this.props.Core.util.buildIPFSShortURL(artifact, file);

			let _this = this;
			this.props.Core.Network.getThumbnailFromIPFS(ipfsShortURL, function(srcData){
				try {
					_this.setState({ src: srcData });
				} catch(e) { }
			})
		}
	}
	render() {
		return (
			<div style={{height: "100%", verticalAlign: "middle", display: "flex"}}>
				<img onContextMenu={(e)=>  {e.preventDefault();}} onDragStart={(e)=>  {e.preventDefault();}} ref="image" src={this.state.src} style={{width: "auto", maxWidth: "100%", maxHeight:"100%", display: "block",margin: "auto", backgroundColor: "#fff"}} alt="" />
			</div>
		);
	}
}

export default ImageContainer;