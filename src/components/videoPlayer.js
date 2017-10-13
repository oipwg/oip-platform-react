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
		if (this.props.artifact === nextProps.artifact && this.props.DisplayPaywall && !nextProps.DisplayPaywall){
			this.player.play()
		}

		if (this.props.artifact === nextProps.artifact){
			return false;
		} else {
			return true;
		}
	}
	componentDidUpdate() {
		this.updateVideoPlayer();
	}
	componentWillUnmount() {
		if (this.player) {
			try {
				this.player.reset()
			} catch(e){
				console.error(e);
			}
		}
	}
	createVideoPlayer() {
		if (this.props.CurrentFile){
			let videoURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, this.props.CurrentFile));
			let thumbnailURL;

			if (this.props.ThumbnailFile){
				thumbnailURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, this.props.ThumbnailFile));
			}

			var options = {}

			let autoplay = true;

			if (this.props.DisplayPaywall)
				autoplay = false;

			options.autoplay = autoplay;
			if (this.props.ThumbnailFile){
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
			this.player.reset();
			let videoURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, this.props.CurrentFile));
			let thumbnailURL;
			
			if (this.props.ThumbnailFile){
				thumbnailURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.artifact, this.props.ThumbnailFile));
			}

			var options = {}

			let autoplay = true;

			if (this.props.DisplayPaywall)
				autoplay = false;

			this.player.autoplay(autoplay);

			if (this.props.ThumbnailFile){
				options.poster = thumbnailURL;
				this.player.poster(options.poster);
			}
			options.sources = [{src: videoURL, type: 'video/mp4'}];

			// instantiate video.js
			this.player.src(options.sources);

			if (!this.props.DisplayPaywall)
				this.player.play();
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