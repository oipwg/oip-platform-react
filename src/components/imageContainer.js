import React, { Component } from 'react';

class ImageContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {src: ""};

		this.updateImage = this.updateImage.bind(this);
		this.loadIntoImage = this.loadIntoImage.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let activeFile = newState.FilePlaylist[active];

		let stateObj = {
			CurrentArtifact: currentArtifact,
			ActiveFile: activeFile
		}

		if (stateObj && this.state !== stateObj){
			this.setState(stateObj);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
		this.updateImage();
	}
	componentDidUpdate(){
		this.updateImage();
	}
	updateImage(){
		if (this.state.ActiveFile && this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid){
			this.loadIntoImage(this.state.CurrentArtifact.artifact, this.props.Core.Artifact.getThumbnail(this.state.CurrentArtifact.artifact));
		} else {
			if (this.state.CurrentArtifact){
				this.loadIntoImage(this.state.CurrentArtifact.artifact, this.state.ActiveFile.info);
			}
		}
	}
	loadIntoImage(artifact, file){
		if (artifact && file){
			this.setState({src: ""});

			let ipfsShortURL = this.props.Core.util.buildIPFSShortURL(artifact, file);

			let _this = this;
			this.props.Core.Network.getThumbnailFromIPFS(ipfsShortURL, function(srcData){
				try {
					_this.setState({ src: srcData });
				} catch(e) { }
			})

			// setTimeout(function(){
			// 	if (!_this.hasUpdated){
			// 		let longURL = _this.props.Core.util.buildIPFSURL(ipfsShortURL);
			// 		_this.setState({ src: longURL });
			// 	}
			// }, 2 * 1000)
		}
	}
	render() {
		let preventTheft = true;

		if (this.state.ActiveFile && !this.state.ActiveFile.isPaid){
			preventTheft = false;
		}
		return (
			<div style={{height: "100%", verticalAlign: "middle"}}>
				<img className="img-container" onContextMenu={(e)=>  { if (preventTheft) e.preventDefault();}} onDragStart={(e)=>  { if (preventTheft) e.preventDefault();}} ref="image" src={this.state.src} style={{width: "auto", maxWidth: "100%", display: "block",margin: "auto", backgroundColor: "#fff"}} alt="" />
			</div>
		);
	}
}

export default ImageContainer;