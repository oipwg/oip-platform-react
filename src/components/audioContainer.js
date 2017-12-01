import React, { Component } from 'react';

import { updateFileCurrentTime, isPlayingFile, isPlayableFile, isSeekableFile, updateFileDuration, setVolume, setMute, playlistNext } from '../actions'

import ColorThief from 'color-thief-standalone';

import AudioVisualizer from './AudioVisualizer.js';
import PlaylistScroller from './PlaylistScroller.js';
import IPFSImage from './IPFSImage.js';

import { PlaybackControls, ProgressBar, TimeMarker, MuteToggleButton, VolumeSlider } from 'react-player-controls'

import '../assets/css/audio-player.css';

class AudioContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ActiveFile: {},
			VolumeControls: {},
			showPrevious: false,
			hasPrevious: false,
			showNext: false,
			hasNext: false,
			bgColor: "#000",
			mainColor: "#fff"
		};

		this.onImageLoad = this.onImageLoad.bind(this);
		this.onCanPlay = this.onCanPlay.bind(this);
		this.onPlaybackChange = this.onPlaybackChange.bind(this);
		this.onTimeUpdate = this.onTimeUpdate.bind(this);
		this.onSeek = this.onSeek.bind(this);
		this.onMuteChange = this.onMuteChange.bind(this);
		this.onVolumeChange = this.onVolumeChange.bind(this);
		this.onAudioPlay = this.onAudioPlay.bind(this);
		this.onAudioPause = this.onAudioPause.bind(this);
		this.nextSong = this.nextSong.bind(this);

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let updateState = this.stateDidUpdate;

		this.unsubscribe = this.props.store.subscribe(() => {
			updateState();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact, active, activeFile, filePlaylist, VolumeControls;

		if (newState.CurrentArtifact)
			currentArtifact = newState.CurrentArtifact;
		if (newState.FilePlaylist){
			filePlaylist = newState.FilePlaylist;
			active = newState.FilePlaylist.active;
			activeFile = newState.FilePlaylist[active];
		}
		if (newState.VolumeControls)
			VolumeControls = newState.VolumeControls;

		let stateObj = {
			CurrentArtifact: currentArtifact,
			ActiveFile: activeFile,
			active,
			FilePlaylist: filePlaylist,
			VolumeControls
		}

		this.setState(stateObj);

		if (VolumeControls && VolumeControls.volume && this.audio)
			this.audio.volume = VolumeControls.volume;
	}
	componentWillUnmount(){
		this.audio.removeEventListener("canplay", this.onCanPlay)
		this.audio.removeEventListener("timeupdate", this.onTimeUpdate)
		this.audio.removeEventListener("play", this.onAudioPlay)
		this.audio.removeEventListener("pause", this.onAudioPause)

		this.unsubscribe();
	}
	componentDidMount(){
		this.audio.addEventListener("canplay", this.onCanPlay)
		this.audio.addEventListener("timeupdate", this.onTimeUpdate)
		this.audio.addEventListener("play", this.onAudioPlay)
		this.audio.addEventListener("pause", this.onAudioPause)

		this.stateDidUpdate();
	}
	onImageLoad(img){
		try {
			let colorThief = new ColorThief();
			let palette = colorThief.getPalette(img, 2);
			this.setState({bgColor: "rgb(" + palette[0].join(',') + ")"})
			this.setState({mainColor: "rgb(" + palette[1].join(',') + ")"})

			img.style.display = "none";
		} catch(e){ 
			console.error(e) 
		}
	}
	onCanPlay(canPlay){
		this.props.store.dispatch(isPlayableFile(this.state.active, true));
		this.props.store.dispatch(isSeekableFile(this.state.active, true));
	}
	onTimeUpdate(event){
		if (event && event.srcElement && this && this.audio){
			this.props.store.dispatch(updateFileCurrentTime(this.state.active, event.srcElement.currentTime));

			if (this.state.ActiveFile.duration !== event.srcElement.duration && event.srcElement.duration)
				this.props.store.dispatch(updateFileDuration(this.state.active, event.srcElement.duration));
		}
	}
	onAudioPlay(){
		this.props.store.dispatch(isPlayingFile(this.state.active, true));
	}
	onAudioPause(){
		this.props.store.dispatch(isPlayingFile(this.state.active, false));
	}
	onPlaybackChange(shouldPlay){
		if (shouldPlay)
			this.audio.play();
		else
			this.audio.pause();
	}
	onSeek(time){
		if (time){
			this.audio.currentTime = time;

			if (this.audio.paused)
				this.audio.play();
		}
	}
	onMuteChange(mute){
		let newVolume = mute ? 0 : this.state.VolumeControls.lastVolume;

		this.props.store.dispatch(setMute(mute, newVolume));

		if (newVolume !== 0)
			this.props.store.dispatch(setVolume(newVolume));

		try {
			this.audio.volume = newVolume;
		} catch (e) {}
	}
	onVolumeChange(volume){
		//this.setState({volume: volume, lastVolume: volume});
		this.props.store.dispatch(setVolume(volume));

		try {
			this.audio.volume = volume;
		} catch (e) {}
	}
	nextSong(){
		this.props.store.dispatch(playlistNext({type: "Audio"}));
	}
	render() {
		//console.log("audioState: ", this.state);

		let name, artist, playlistLen = 0, paywall = false, ipfsHash = "", songURL = "";

		if (this.state.ActiveFile && this.state.ActiveFile.info){
			name = this.state.ActiveFile.info.dname ? this.state.ActiveFile.info.dname : this.state.ActiveFile.info.fname;
			paywall = ((this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid) || (!this.state.ActiveFile.owned && this.state.ActiveFile.isPaid));

			if (this.state.ActiveFile.currentTime === this.state.ActiveFile.duration && this.state.ActiveFile.currentTime !== 0 && this.state.ActiveFile.isPlaying)
				this.nextSong();

			if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact){
				ipfsHash = this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.props.Core.Artifact.getThumbnail(this.state.CurrentArtifact.artifact));
				songURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.state.ActiveFile.info));
				artist = this.props.Core.Artifact.getArtist(this.state.CurrentArtifact.artifact);
			}
		}
		if (this.state.FilePlaylist){
			playlistLen = Object.keys(this.state.FilePlaylist).length - 1;
		}
		
		return (
			<div className="" style={{paddingTop: "20px", backgroundColor: this.state.bgColor, height: "100%", position: "relative", overflow: "hidden", minHeight: "65vh"}}>
				<audio
					ref={audio => this.audio = audio}
					autoPlay={!paywall}
					controls={true}
					src={songURL}
					style={{display: "none"}}
					>
				</audio>
				<div className="container" style={{height: "90%"}}>
					<div className="row" style={{height: "90%"}}>
						<div className={playlistLen > 1 ? "col-6" : "col-12"} style={{margin: "auto"}}>
							<h3 className="text-center" style={{color: this.state.mainColor}}>
								{name} - {artist}
							</h3>
							<div style={{width: "100%", height: "auto", maxWidth: "350px", maxHeight: "350px", margin: "0px auto", marginTop: "25px", display: "block"}}>
								<IPFSImage Core={this.props.Core} hash={ipfsHash} onImageLoad={this.onImageLoad} />
							</div>
						</div>
						{playlistLen > 1 ? 
						<div className="col-6" style={{margin: "auto"}}>
							<PlaylistScroller Core={this.props.Core} store={this.props.store} mainColor={this.state.mainColor} bgColor={this.state.bgColor} currentArtifactOnly={true} filter={{type: "Audio"}} />
						</div> : ""}
					</div>
				</div>
				<div style={{width:"102%", height: "200px", position: "absolute", bottom: "10px", marginLeft: "-10px"}}>
					<AudioVisualizer audio={this.audio} mainColor={this.state.mainColor} />
				</div>
				<div style={{width:"100%", height: "40px", position: "absolute", bottom: "0px", borderTop: "1px solid " + this.state.mainColor, display: "flex", backgroundColor: this.state.bgColor}}>
					<div style={{width: "auto", height: "auto", margin: "auto", borderRight: "1px solid " + this.state.mainColor, display: "flex"}} onClick={this.toggleAudio}>
						<PlaybackControls
							isPlayable={this.state.ActiveFile.isPlayable}
							isPlaying={this.state.ActiveFile.isPlaying}
							showPrevious={this.state.showPrevious}
							hasPrevious={this.state.hasPrevious}
							showNext={this.state.showNext}
							hasNext={this.state.hasNext}
							onPlaybackChange={this.onPlaybackChange}
							onPrevious={() => alert('Go to previous')}
							onNext={() => alert('Go to next')}
						/>
					</div>
					<div style={{width: "100%"}}>
						<style dangerouslySetInnerHTML={{
							__html: [
								'.ProgressBar {',
								'    background: ' + this.state.bgColor + ' !important;',
								'}',
								'.ProgressBar-elapsed {',
								'    background-color: ' + this.state.mainColor + ' !important;',
								'    border: 1px solid ' + this.state.bgColor + ' !important;',
								'}'
							].join('\n')
						}} />
						<ProgressBar
							style={{width: "100%"}}
							totalTime={this.state.ActiveFile.duration}
							currentTime={this.state.ActiveFile.currentTime}
							isSeekable={this.state.ActiveFile.isSeekable}
							onSeek={this.onSeek}
						/>
						<span style={{mixBlendMode: "difference", color: "#fff", verticalAlign: "middle", lineHeight: "35px", marginLeft: "10px", marginTop: "-76px", display: "inline-block"}}>
							<TimeMarker
								totalTime={this.state.ActiveFile.duration}
								currentTime={this.state.ActiveFile.currentTime}
								markerSeparator=" / "
							/>
						</span>
					</div>
					<div style={{width: "40px", height: "100%", borderLeft: "1px solid " + this.state.mainColor, display: "flex"}}>
						<MuteToggleButton
							isMuted={this.state.VolumeControls.isMuted}
							onMuteChange={this.onMuteChange}
							isEnabled={this.state.ActiveFile.isPlayable}
						/>
						<VolumeSlider
							volume={this.state.VolumeControls.volume}
							onVolumeChange={this.onVolumeChange}
							isEnabled={this.state.ActiveFile.isPlayable}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default AudioContainer;