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
		this.refs.canvas = undefined;
	}
	tryImageUpdate(){
		if (this.state.active !== this.props.hash){
			this.requestImageFromIPFS();	
		}
	}
	requestImageFromIPFS(){
		this.setState({isFetching: true, imageLoaded: false, active: this.props.hash});

		this.refs.canvas.getContext("2d").clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

		this.props.Core.Network.getThumbnailFromIPFS(this.props.hash, this.receiveDataFromIPFS);
	}
	receiveDataFromIPFS(base64, hash){
		if (hash === this.state.active){
			let img = new Image();
			let canvas = this.refs.canvas;

			let _this = this;

			img.onload = function(){
				try {
					if (!_this.props.cover && canvas){
						canvas.width = this.naturalWidth;
						canvas.height = this.naturalHeight;
					}
				} catch (e) {}
				if (_this.props.cover && canvas){
					_this.drawImageProp(canvas.getContext("2d"), this, 0, 0, canvas.width, canvas.height);
				} else {
					if (canvas)
						canvas.getContext("2d").drawImage(this, 0, 0);
				}

				_this.imageLoaded();
				if (typeof _this.props.onImageLoad === "function"){
					_this.props.onImageLoad(this)
				}

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