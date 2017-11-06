import React, { Component } from 'react';

class IPFSImage extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

		this.requestImageFromIPFS = this.requestImageFromIPFS.bind(this);
		this.receiveDataFromIPFS = this.receiveDataFromIPFS.bind(this);
		this.tryImageUpdate = this.tryImageUpdate.bind(this);
	}
	componentDidMount(){
		this.tryImageUpdate();
	}
	componentWillReceiveProps(nextProps){
		
	}
	componentDidUpdate(){
		this.tryImageUpdate();
	}
	componentWillUnmount(){
		
	}
	tryImageUpdate(){
		if (this.state.active !== this.props.hash){
			this.requestImageFromIPFS();	
		}
	}
	requestImageFromIPFS(){
		this.setState({isFetching: true, fullImage: false, active: this.props.hash});
		this.props.Core.Network.getFileFromIPFS(this.props.hash, this.receiveDataFromIPFS);
	}
	receiveDataFromIPFS(base64, hash){
		console.log("receive");
		console.log(hash);
		console.log(this.state.active);
		if (hash === this.state.active){
			let img = new Image;
			let canvas = this.refs.canvas

			img.onload = function(){
				console.log("drew in canvas");
				canvas.width = this.naturalWidth;
				canvas.height = this.naturalHeight;
				canvas.getContext("2d").drawImage(this, 0, 0);
			};

			img.src = base64;
		}
	}
	render() {
		return (
			<canvas ref='canvas' style={{width: "inherit", height: "inherit"}} />
		);
	}
}

export default IPFSImage;