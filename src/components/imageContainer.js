import React, { Component } from 'react';

class ImageContainer extends Component {
	componentDidMount(){
		if (this.props.DisplayPaywall){
			this.loadIntoImage(this.props.artifact, this.props.ThumbnailFile);
		} else {
			this.loadIntoImage(this.props.artifact, this.props.CurrentFile);
		}
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps.ArtifactManager.currentFile);
		let mainFile;

		if (this.props.CurrentFile !== nextProps.CurrentFile){
			this.setState({src: ""});
			this.hasUpdated = true;
		}

		if (nextProps.DisplayPaywall){
			this.loadIntoImage(nextProps.artifact, nextProps.ThumbnailFile);
		} else {
			this.loadIntoImage(nextProps.artifact, nextProps.CurrentFile);
		}
	}
	constructor(props) {
		super(props);
		this.state = {src: ""};

		this.loadIntoImage = this.loadIntoImage.bind(this);
	}
	loadIntoImage(artifact, file){
		if (artifact && file){
			this.setState({src: ""});

			let ipfsShortURL = this.props.Core.util.buildIPFSShortURL(artifact, file);

			this.hasUpdated = false;
			let _this = this;
			this.props.Core.Network.getThumbnailFromIPFS(ipfsShortURL, function(srcData){
				try {
					_this.setState({ src: srcData });
					_this.hasUpdated = true;
				} catch(e) { }
			})

			setTimeout(function(){
				if (!_this.hasUpdated){
					let longURL = _this.props.Core.util.buildIPFSURL(ipfsShortURL);
					_this.setState({ src: longURL });
				}
			}, 2 * 1000)
		}
	}
	render() {
		return (
			<div style={{height: "100%", verticalAlign: "middle"}}>
				<img className="img-container" onContextMenu={(e)=>  {e.preventDefault();}} onDragStart={(e)=>  {e.preventDefault();}} ref="image" src={this.state.src} style={{width: "auto", maxWidth: "100%", display: "block",margin: "auto", backgroundColor: "#fff"}} alt="" />
			</div>
		);
	}
}

export default ImageContainer;