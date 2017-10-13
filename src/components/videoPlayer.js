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
		if (this.props.artifact === nextProps.artifact && this.props.paid && !nextProps.paid){
			this.player.play()
		}

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
		if (this.props.CurrentFile){
			let videoURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, this.props.CurrentFile));
			let thumbnail = this.props.Core.Artifact.getThumbnail(this.props.artifact);
			let thumbnailURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, thumbnail));

			var options = {}

			let autoplay = true;

			if (this.props.Core.Artifact.paid(this.props.artifact))
				autoplay = false;

			options.autoplay = autoplay;
			if (thumbnail){
				options.poster = thumbnailURL;
			}
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

			if (thumbnail){
				options.poster = thumbnailURL;
				this.player.poster(options.poster);
			}
			options.sources = [{src: videoURL, type: 'video/mp4'}];

			// instantiate video.js
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