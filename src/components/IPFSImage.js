import React, { Component } from 'react';

import Spinner from 'react-spinkit';

class IPFSImage extends Component {
	constructor(props){
		super(props);

		this.state = {
			isFetching: true,
			imageLoaded: false
		}

		this.IPFSRequests = [];

		this.requestImageFromIPFS = this.requestImageFromIPFS.bind(this);
		this.receiveDataFromIPFS = this.receiveDataFromIPFS.bind(this);
		this.tryImageUpdate = this.tryImageUpdate.bind(this);
		this.imageLoaded = this.imageLoaded.bind(this);
	}
	componentDidMount(){
		this._ismounted = true;
		this.tryImageUpdate();
	}
	componentWillReceiveProps(nextProps, nextState){
		if (nextProps.cover !== this.props.cover){
			this.requestNewIPFS = true;
		}
	}
	componentDidUpdate(){
		this.tryImageUpdate();
	}
	componentWillUnmount(){
		this.refs.canvas = undefined;
		
		for (var i = 0; i < this.IPFSRequests.length; i++) {
			// Run the cancelation function that was returned at time of the initial IPFS call
			try {
				this.IPFSRequests[i]();
			} catch (e) {}
		}
		this._ismounted = false;
	}
	tryImageUpdate(){
		if (this.state.active !== this.props.hash || this.requestNewIPFS){
			this.requestNewIPFS = false;
			this.requestImageFromIPFS();	
		}
	}
	requestImageFromIPFS(){
		this.setState({isFetching: true, imageLoaded: false, active: this.props.hash}, () => {
			this.refs.canvas.getContext("2d").clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

			this.IPFSRequests.push(this.props.Core.Network.getThumbnailFromIPFS(this.props.hash, this.receiveDataFromIPFS));
		});
	}
	receiveDataFromIPFS(urlORbase64, hash){
		if (!this._ismounted)
			return;

		if (hash === this.state.active){
			let img = new Image;
			let canvas = this.refs.canvas;

			if (canvas){
				this.initialWidth = canvas.width;
				this.initialHeight = canvas.height;
			}

			let _this = this;

			img.onload = function(){
				if (!_this._ismounted)
					return;

				try {
					if (!_this.props.cover && canvas){
						canvas.width = img.naturalWidth;
						canvas.height = img.naturalHeight;
					}
				} catch (e) {}

				if (_this.props.cover && canvas){
					let ctx = canvas.getContext("2d");

					// Draw a white background for the image to sit on
					ctx.fillStyle = "#fff"
					ctx.fillRect(0,0,canvas.width,canvas.height);
					ctx.stroke();

					// Draw the image
					_this.drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
				} else {
					if (canvas) {
						let ctx = canvas.getContext("2d");

						// Draw a white background for the image to sit on
						ctx.fillStyle = "#fff"
						ctx.fillRect(0,0,canvas.width,canvas.height);
						ctx.stroke();

						// Draw the image
						ctx.drawImage(img, 0, 0);
					}
				}

				_this.imageLoaded();
				if (typeof _this.props.onImageLoad === "function"){
					_this.props.onImageLoad(img)
				}

				img = undefined;
			};

			img.onerror = function(error){
				_this.imageLoaded();
			}

			img.src = urlORbase64;

			this.setState({isFetching: false});
		}
	}
	imageLoaded(){
		this.setState({imageLoaded: true})
	}
	render() {
		let preventTheft = this.props.cover ? false : true;
		let widthProps = this.props.width ? this.props.width : false;
		let heightProps = this.props.height ? this.props.height : false;
		console.log(this.props.cover);
		return (
			<div style={{width: widthProps ? widthProps : "inherit", maxWidth: widthProps ? widthProps : "inherit", height: heightProps ? heightProps : "inherit", maxHeight: heightProps ? heightProps : "inherit"}}>
				{ (!this.state.imageLoaded && !(this.props.hash === "")) ? <div style={{height: "100%", margin: "auto"}} className="spinner-container"><Spinner name="wave" color="aqua"/></div> : ''}
				<canvas ref='canvas' className="" style={{width: widthProps ? widthProps : "inherit", maxWidth: widthProps ? widthProps : "inherit", height: heightProps ? heightProps : "inherit", maxHeight: heightProps ? heightProps : "inherit", objectFit: this.props.cover ? "cover" : "contain", margin: "auto", display: this.state.imageLoaded ? "flex" : "none"}} onContextMenu={(e)=>  { if (preventTheft) e.preventDefault();}} onDragStart={(e)=>  { if (preventTheft) e.preventDefault();}} />
			</div>
		);
	}
	drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
		if (arguments.length === 2) {
			x = y = 0;
			w = ctx.canvas.width;
			h = ctx.canvas.height;
		}

		// default offset is center
		offsetX = typeof offsetX === "number" ? offsetX : 0.5;
		offsetY = typeof offsetY === "number" ? offsetY : 0.5;

		// keep bounds [0.0, 1.0]
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > 1) offsetX = 1;
		if (offsetY > 1) offsetY = 1;

		var iw = img.width,
			ih = img.height,
			r = Math.min(w / iw, h / ih),
			nw = iw * r,   // new prop. width
			nh = ih * r,   // new prop. height
			cx, cy, cw, ch, ar = 1;

		// decide which gap to fill    
		if (nw < w) ar = w / nw;                             
		if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
		nw *= ar;
		nh *= ar;

		// calc source rectangle
		cw = iw / (nw / w);
		ch = ih / (nh / h);

		cx = (iw - cw) * offsetX;
		cy = (ih - ch) * offsetY;

		// make sure source rectangle is valid
		if (cx < 0) cx = 0;
		if (cy < 0) cy = 0;
		if (cw > iw) cw = iw;
		if (ch > ih) ch = ih;

		// fill image in dest. rectangle
		ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
	}
}

export default IPFSImage;