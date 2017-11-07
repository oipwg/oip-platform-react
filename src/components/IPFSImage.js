import React, { Component } from 'react';

class IPFSImage extends Component {
	constructor(props){
		super(props);

		this.state = {
			isFetching: true,
			imageLoaded: false
		}

		this.requestImageFromIPFS = this.requestImageFromIPFS.bind(this);
		this.receiveDataFromIPFS = this.receiveDataFromIPFS.bind(this);
		this.tryImageUpdate = this.tryImageUpdate.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
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
		this.setState({isFetching: true, imageLoaded: false, active: this.props.hash});

		this.refs.canvas.getContext("2d").clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

		this.props.Core.Network.getFileFromIPFS(this.props.hash, this.receiveDataFromIPFS);
	}
	receiveDataFromIPFS(base64, hash){
		if (hash === this.state.active){
			let img = new Image;
			let canvas = this.refs.canvas

			let _this = this;

			img.onload = function(){
				try {
					canvas.width = this.naturalWidth;
					canvas.height = this.naturalHeight;
				} catch (e){}
				canvas.getContext("2d").drawImage(this, 0, 0);

				_this.imageLoaded();

				img = undefined;
			};

			img.src = base64;

			this.setState({isFetching: false});
		}
	}
	imageLoaded(){
		this.setState({imageLoaded: true})
	}
	render() {
		let preventTheft = true;
		let widthProps = this.props.width ? this.props.width : false;
		return (
			<canvas ref='canvas' style={{width: widthProps ? widthProps : "inherit", height: "inherit", objectFit: "cover", backgroundColor: "#fff", margin: "auto", display: this.state.imageLoaded ? "flex" : "none"}} onContextMenu={(e)=>  { if (preventTheft) e.preventDefault();}} onDragStart={(e)=>  { if (preventTheft) e.preventDefault();}} />
		);
	}
}

export default IPFSImage;