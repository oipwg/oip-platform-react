import React, { Component } from 'react';

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
			isPlayable: false,
			isSeekable: false,
			isPlaying: false,
			showPrevious: false,
			hasPrevious: false,
			showNext: false,
			hasNext: false,
			isMuted: false,
			totalTime: 0,
			currentTime: 0,
			volume: 0.5,
			lastVolume: 0.5,
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

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let updateState = this.stateDidUpdate;

		this.unsubscribe = this.props.store.subscribe(() => {
			updateState();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact, active, activeFile, filePlaylist;

		if (newState.CurrentArtifact)
			currentArtifact = newState.CurrentArtifact;
		if (newState.FilePlaylist){
			filePlaylist = newState.FilePlaylist;
			active = newState.FilePlaylist.active;
			activeFile = newState.FilePlaylist[active];
		}

		let stateObj = {
			CurrentArtifact: currentArtifact,
			ActiveFile: activeFile,
			FilePlaylist: filePlaylist
		}

		if (stateObj && this.state !== stateObj){
			//let updateSong = this.updateSong;
			this.setState(stateObj, () => {
				//updateSong();
			});
		}
	}
	componentWillUnmount(){
		this.audio.removeEventListener("canplay", this.onCanPlay)
		this.audio.removeEventListener("timeupdate", this.onTimeUpdate)

		this.unsubscribe();
	}
	componentDidMount(){
		this.audio.addEventListener("canplay", this.onCanPlay)
		this.audio.addEventListener("timeupdate", this.onTimeUpdate)

		this.stateDidUpdate();
	}
	onImageLoad(img){
		try {
			let colorThief = new ColorThief();
			let palette = colorThief.getPalette(img, 2);
			this.setState({bgColor: "rgb(" + palette[0].join(',') + ")"})
			this.setState({mainColor: "rgb(" + palette[1].join(',') + ")"})

			img.style.display = "none";
			img = undefined;
		} catch(e){ 
			console.error(e) 
		}
	}
	onCanPlay(canPlay){
		this.setState({ isPlayable: true, isSeekable: true });
	}
	onTimeUpdate(event){
		if (event && event.srcElement && this && this.audio)
			this.setState({ currentTime: event.srcElement.currentTime, totalTime: event.srcElement.duration})
	}
	onPlaybackChange(shouldPlay){
		if (shouldPlay)
			this.audio.play();
		else
			this.audio.pause();

		this.setState({isPlaying: shouldPlay});
	}
	onSeek(time){
		if (time){
			this.audio.currentTime = time;
		}
	}
	onMuteChange(mute){
		let newVolume = mute ? 0 : this.state.lastVolume;
		this.setState({isMuted: mute, volume: newVolume});

		try {
			this.audio.volume = newVolume;
		} catch (e) {}
	}
	onVolumeChange(volume){
		this.setState({volume: volume, lastVolume: volume});

		try {
			this.audio.volume = volume;
		} catch (e) {}
	}
	render() {
		console.log("audioState: ", this.state);

		let name, artist, playlistLen = 0, paywall = false, ipfsHash = "", songURL = "";

		if (this.state.ActiveFile && this.state.ActiveFile.info){
			name = this.state.ActiveFile.info.dname ? this.state.ActiveFile.info.dname : this.state.ActiveFile.info.fname;
			paywall = ((this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid) || (!this.state.ActiveFile.owned && this.state.ActiveFile.isPaid));

			if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact){
				ipfsHash = this.props.Core.util.buildIPFSShortURL(this.state.CurrentArtifact.artifact, this.props.Core.Artifact.getThumbnail(this.state.CurrentArtifact.artifact));
				songURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.CurrentArtifact.artifact, this.state.ActiveFile.info));
			}
		}
		if (this.state.FilePlaylist){
			playlistLen = Object.keys(this.state.FilePlaylist).length - 1;
		}
		
		return (
			<div className="" style={{paddingTop: "20px", backgroundColor: this.state.bgColor, height: "100%", position: "relative", overflow: "hidden"}}>
                <audio
                    ref={audio => this.audio = audio}
                    autoPlay={false}
                    controls={true}
                    //this is the link to my song url feel free to use it or replace it with your own
                    src={songURL}
                    style={{display: "none"}}
                    >
                </audio>
                <div className="container" style={{height: "90%"}}>
	                <div className="row" style={{height: "90%"}}>
		                <div className={playlistLen > 1 ? "col-6" : "col-12"} style={{margin: "auto"}}>
		                	<h3 className="text-center" style={{color: this.state.mainColor}}>
		                		{name} - {this.state.currentSongArtist}
		                	</h3>
							<div style={{width: "100%", height: "auto", maxWidth: "350px", maxHeight: "350px", margin: "0px auto", marginTop: "25px", display: "block"}}>
								<IPFSImage Core={this.props.Core} hash={ipfsHash} onImageLoad={this.onImageLoad} />
							</div>
						</div>
						{playlistLen > 1 ? 
						<div className="col-6" style={{margin: "auto"}}>
							<PlaylistScroller Core={this.props.Core} store={this.props.store} mainColor={this.state.mainColor} bgColor={this.state.bgColor} currentArtifactOnly={true} />
						</div> : ""}
					</div>
				</div>
				<div style={{width:"102%", height: "200px", position: "absolute", bottom: "10px", marginLeft: "-10px"}}>
					<AudioVisualizer audio={this.audio} mainColor={this.state.mainColor} />
                </div>
                <div style={{width:"100%", height: "40px", position: "absolute", bottom: "0px", borderTop: "1px solid " + this.state.mainColor, display: "flex", backgroundColor: this.state.bgColor}}>
                	<div style={{width: "auto", height: "auto", margin: "auto", borderRight: "1px solid " + this.state.mainColor, display: "flex"}} onClick={this.toggleAudio}>
                		<PlaybackControls
							isPlayable={this.state.isPlayable}
							isPlaying={this.state.isPlaying}
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
							totalTime={this.state.totalTime}
							currentTime={this.state.currentTime}
							isSeekable={this.state.isSeekable}
							onSeek={this.onSeek}
						/>
                		<span style={{mixBlendMode: "difference", color: "#fff", verticalAlign: "middle", lineHeight: "35px", marginLeft: "10px", marginTop: "-76px", display: "inline-block"}}>
		            		<TimeMarker
								totalTime={this.state.totalTime}
								currentTime={this.state.currentTime}
								markerSeparator=" / "
							/>
						</span>
                	</div>
                	<div style={{width: "40px", height: "100%", borderLeft: "1px solid " + this.state.mainColor, display: "flex"}}>
	                	<MuteToggleButton
							isMuted={this.state.isMuted}
							onMuteChange={this.onMuteChange}
							isEnabled={this.state.isPlayable}
						/>
						<VolumeSlider
							volume={this.state.volume}
							onVolumeChange={this.onVolumeChange}
							isEnabled={this.state.isPlayable}
						/>
                	</div>
                </div>
			</div>
		);
	}
}

export default AudioContainer;