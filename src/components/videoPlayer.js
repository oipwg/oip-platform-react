import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

class VideoPlayer extends Component {
	constructor(props){
		super(props);
		this.createVideoPlayer = this.createVideoPlayer.bind(this);
		this.updateVideoPlayer = this.updateVideoPlayer.bind(this);
	}
	componentDidMount() {
		this.createVideoPlayer();
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.props.artifact === nextProps.artifact){
			return false;
		} else {
			return true;
		}
	}
	componentDidUpdate() {
		console.log("update");
		this.updateVideoPlayer();
	}
	componentWillUnmount() {
		if (this.player) {
			try {
				this.player.dispose()
			} catch(e){}
		}
	}
	createVideoPlayer() {
		if (this.props.artifact){
			let mainVideo = this.props.Core.Artifact.getMainFile(this.props.artifact);
			let videoURL = this.props.Core.util.buildIPFSURL(mainVideo);
			let thumbnail = this.props.Core.Artifact.getThumbnail(this.props.artifact);
			let thumbnailURL = this.props.Core.util.buildIPFSURL(thumbnail);

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
		}
	}
	updateVideoPlayer(){
		if (this.props.artifact){
			let mainVideo = this.props.Core.Artifact.getMainFile(this.props.artifact);
			let videoURL = this.props.Core.util.buildIPFSURL(mainVideo);
			let thumbnail = this.props.Core.Artifact.getThumbnail(this.props.artifact);
			let thumbnailURL = this.props.Core.util.buildIPFSURL(thumbnail);

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
			this.player.poster(options.poster);
			this.player.src(options.sources);
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