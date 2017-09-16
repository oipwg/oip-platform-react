import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

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
			thumbnailURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + thumbnail.fname;
		}
		if (mainVideo){
			videoURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + mainVideo.fname;
		}

		var options = {}

		options.autoplay = false;
		options.poster = thumbnailURL ? thumbnailURL : "";
		options.controls = true;
		options.preload = "auto";
		options.sources = [{src: videoURL, type: 'video/mp4'}];

		// instantiate video.js
		this.player = videojs(this.videoNode, options, function onPlayerReady() {
			// console.log('onPlayerReady', this);
			var mainWidth = this.player().el_.offsetWidth;
			var videoWidth = this.children_[0].offsetWidth;

			var offset = (mainWidth - videoWidth) / 2;

			this.children_[0].style['margin-right'] = offset;
			this.children_[0].style['margin-left'] = offset;
		});
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