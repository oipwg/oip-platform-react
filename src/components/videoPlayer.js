import React, { Component } from 'react';
import videojs from 'video.js';

// import VideoStream from 'videostream';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

import IPFS_MAIN from 'ipfs'
const ipfs = new IPFS_MAIN()

class VideoPlayer extends Component {
	componentDidMount() {
		let thumbnail;
		let mainVideo;

		let files = this.props.artifact['oip-041'].artifact.storage.files;
		let mainHash = this.props.artifact['oip-041'].artifact.storage.location;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Video" && !mainVideo)
				mainVideo = files[i];
		}

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Image" && !thumbnail)
				thumbnail = files[i];
		}

		let thumbnailURL = "";
		let videoURL = "";

		if (thumbnail){
			thumbnailURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + encodeURIComponent(thumbnail.fname);
		}
		if (mainVideo){
			videoURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + encodeURIComponent(mainVideo.fname);
		}

		var options = {}

		options.autoplay = false;
		options.poster = thumbnailURL ? thumbnailURL : "";
		options.controls = true;
		options.preload = "auto";
		options.chromecast = {
			appId:'B49D4F18',
			metadata:{
				title: this.props.artifact['oip-041'].artifact.info.title,
				subtitle:this.props.artifact['oip-041'].artifact.info.description ? this.props.artifact['oip-041'].artifact.info.description : "",
			}
		}
		options.sources = [{src: videoURL, type: 'video/mp4'}];

		// instantiate video.js
		this.player = videojs(this.videoNode, options, function onPlayerReady() {
			// console.log('onPlayerReady', this);
		});
		// let _this = this;

		// ipfs.files.cat(thumbnailURL, function (err, file) {
		// 	var videostream = VideoStream(file, _this.videoNode);				
		// })
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			try {
				this.player.dispose()
			} catch(e){}
		}
	}
	render() {
		return (
			<div data-vjs-player>
				<video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered">
				</video>
			</div>
		);
	}
}

export default VideoPlayer;