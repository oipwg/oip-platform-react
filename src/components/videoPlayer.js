import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

class VideoPlayer extends Component {
	constructor(props){
		super(props);

		this.state = {
			ActiveFile: {},
			Artifact: {}
		}

		this.createVideoPlayer = this.createVideoPlayer.bind(this);
		this.updateVideoPlayer = this.updateVideoPlayer.bind(this);

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.state.ActiveFile !== nextState.ActiveFile){
			return true;
		}

		return false;
	}
	componentDidUpdate(){
		this.updateVideoPlayer();
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact.artifact;
		let active = newState.FilePlaylist.active;
		let activeFile = newState.FilePlaylist[active];

		if (activeFile && this.state.ActiveFile !== activeFile){
			console.log(currentArtifact);
			console.log(activeFile);

			this.setState({
				Artifact: currentArtifact,
				ActiveFile: activeFile
			});

			console.log(this.state);
			
			this.updateVideoPlayer();
		}
	}
	componentWillUnmount(){
		this.unsubscribe();

		if (this.player) {
			try {
				this.player.pause()
				this.player.reset()
			} catch(e){
				console.error(e);
			}
		}
	}
	componentDidMount() {
		this.stateDidUpdate();
		this.createVideoPlayer();
	}
	getPlayerOptions() {
		var options = {};

		options.controls = true;
		options.preload = "auto";

		let videoURL;

		if (this.state.Artifact && this.state.ActiveFile.info){
			videoURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.Artifact, this.state.ActiveFile.info));
		} else {
			videoURL = "";
		}

		let thumbnailURL;

		if (this.state.Artifact){
			let thumbnail = this.props.Core.Artifact.getThumbnail(this.state.Artifact);
			thumbnailURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.Artifact, thumbnail));
		}

		let autoplay = true;

		if (this.state.isPaid && !this.state.hasPaid)
			autoplay = false;

		if (thumbnailURL){
			options.poster = thumbnailURL;
		}

		options.autoplay = autoplay;
		options.sources = [{src: videoURL, type: 'video/mp4'}];

		return options;
	}
	createVideoPlayer() {
		// instantiate video.js
		this.player = videojs(this.videoNode, this.getPlayerOptions(), function onPlayerReady() {
			// console.log('onPlayerReady', this);
		});
	}
	updateVideoPlayer(){
		if (this.state.Artifact && this.state.ActiveFile){
			if (this.player){
				this.player.reset();

				let options = this.getPlayerOptions();

				if (options.poster){
					this.player.poster = options.poster;
				}

				this.player.autoplay(options.autoplay);

				this.player.src(options.sources);

				if (!this.props.DisplayPaywall){
					this.player.play();
				}
			} else {
				this.createVideoPlayer();		
			}
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