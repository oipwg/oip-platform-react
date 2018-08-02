import React, { Component } from 'react';
import ColorThief from 'color-thief-standalone';
import PropTypes from 'prop-types';
import { PlaybackControls, ProgressBar, TimeMarker, MuteToggleButton, VolumeSlider } from 'react-player-controls'

import AudioVisualizer from './AudioVisualizer.js';
import PlaylistScroller from './PlaylistScroller.js';


import '../assets/css/audio-player.css';
import '../assets/css/alexandria-audio-player.css';

class AudioContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFile: {},
			volumeControls: {},
			showPrevious: false,
			hasPrevious: false,
			showNext: false,
			hasNext: false,
			bgColor: "#000",
			mainColor: "#fff",
            prevTimestamp: 0
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
	}

	componentWillUnmount(){
		this.audio.removeEventListener("canplay", this.onCanPlay)
		this.audio.removeEventListener("timeupdate", this.onTimeUpdate)
		this.audio.removeEventListener("play", this.onAudioPlay)
		this.audio.removeEventListener("pause", this.onAudioPause)
	}

	componentDidMount(){
		this.audio.addEventListener("canplay", this.onCanPlay)
		this.audio.addEventListener("timeupdate", this.onTimeUpdate)
		this.audio.addEventListener("play", this.onAudioPlay)
		this.audio.addEventListener("pause", this.onAudioPause)

		this.audio.crossOrigin = "anonymous";

        if (this.props.volumeControls && this.props.volumeControls.volume && this.audio)
            this.audio.volume = this.props.volumeControls.volume;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
	    if (nextProps.activeFile.hasPaid !== prevState.hasPaid) {
	        return {
	            hasPaid: nextProps.activeFile.hasPaid
            }
        }
        if (nextProps.activeFile.isPlaying !== prevState.isPlaying) {
	    	return {
	    		isPlaying: nextProps.activeFile.isPlaying
			}
		}

		return null
    }

    componentDidUpdate(prevProps, prevState) {
	    if (prevState.hasPaid == false && this.state.hasPaid) {
	        this.audio.play()
        }
        if (prevState.isPlaying != this.state.isPlaying) {
            if (this.state.isPlaying) {
            	this.audio.play()
			} else {this.audio.pause()}
        }
    }

	onImageLoad(e){
        const img = e.target;
		try {
			let colorThief = new ColorThief();
			let palette = colorThief.getPalette(img, 2);
			this.setState({bgColor: "rgb(" + palette[0].join(',') + ")"})
			this.setState({mainColor: "rgb(" + palette[1].join(',') + ")"})

			// img.style.display = "none";
		} catch(e){
			console.error(e)
		}
	}
	onCanPlay() {
		this.props.isPlayableFile(this.props.active, true);
		this.props.isSeekableFile(this.props.active, true);
	}
	onTimeUpdate(event){
	    let currentTimestamp = Date.now()
        const timeInterval = 500; //Milliseconds

		if (event && event.srcElement && this && this.audio){
		    if (currentTimestamp >= this.state.prevTimestamp + timeInterval) {
                this.props.updateFileCurrentTime(this.props.active, event.srcElement.currentTime);
                this.setState({prevTimestamp: currentTimestamp})

                if (this.props.activeFile.info.getDuration() !== event.srcElement.duration && event.srcElement.duration)
                    this.props.updateFileDuration(this.props.active, event.srcElement.duration);
            }
		}
	}
	onAudioPlay(){
		this.props.isPlayingFile(this.props.active, true);
	}
	onAudioPause(){
		this.props.isPlayingFile(this.props.active, false);
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
		let newVolume = mute ? 0 : this.props.volumeControls.lastVolume;

		this.props.setMute(mute, newVolume);

		if (newVolume !== 0)
			this.props.setVolume(newVolume);

		try {
			this.audio.volume = newVolume;
		} catch (e) {}
	}
	onVolumeChange(volume){
		//this.setState({volume: volume, lastVolume: volume});
		this.props.setVolume(volume);

		try {
			this.audio.volume = volume;
		} catch (e) {}
	}
	nextSong(){
		this.props.playlistNext({type: "Audio"});
	}
	render() {
		let name, artist, playlistLen = 0, paywall = false, ipfsHash = "", songURL = "";

		if (this.props.activeFile && this.props.activeFile.info){
			name = this.props.activeFile.info.getDisplayName() ? this.props.activeFile.info.getDisplayName() : this.props.activeFile.info.getFilename();
			paywall = ((this.props.activeFile.isPaid && !this.props.activeFile.hasPaid) || (!this.props.activeFile.owned && this.props.activeFile.isPaid && !this.props.activeFile.hasPaid));

			if (this.props.activeFile.currentTime === this.props.activeFile.duration && this.props.activeFile.currentTime !== 0 && this.props.activeFile.isPlaying)
				this.nextSong();

			if (this.props.artifact){
				if (this.props.artifact.getThumbnail()) {
                    ipfsHash = this.props.buildIPFSURL(this.props.buildIPFSShortURL(this.props.artifact.getLocation(), this.props.artifact.getThumbnail().getFilename()))
                }
				songURL = this.props.buildIPFSURL(this.props.buildIPFSShortURL(this.props.artifact.getLocation(), this.props.activeFile.info.getFilename()));
				artist = this.props.artifact.getDetail("artist");
			}
		}
		if (this.props.filePlaylist){
			playlistLen = Object.keys(this.props.filePlaylist).length - 1;
		}
		console.log("IPFS Hash: ", !!ipfsHash)
		return (
			<div className="audio-container" style={{paddingTop: "20px", backgroundColor: this.state.bgColor, height: "100%", position: "relative", overflow: "hidden", minHeight: "65vh", maxHeight: "100%"}}>
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
						<div className={playlistLen > 1 ? "col-md-6 col-sm-12" : "col-12"} style={{margin: "auto"}}>
							<h3 className="text-center" style={{color: this.state.mainColor}}>
                                {artist ? artist : "Unknown"} - {name ? name : "Unknown"}
							</h3>
							<div style={{width: "100%", height: "auto", maxWidth: "350px", maxHeight: "350px", margin: "0px auto", marginTop: "25px", display: "block"}}>
								{!!ipfsHash ? <img src={ipfsHash} alt=" " crossOrigin="Anonymous" onLoad={this.onImageLoad}/> : null}
							</div>
						</div>
						{playlistLen > 1 ?
						<div className="col-md-6 col-sm-12" style={{margin: "20px auto"}}>
							<PlaylistScroller
								artifact={this.props.artifact}
								activeFile={this.props.activeFile}
								filePlaylist={this.props.filePlaylist}
								mainColor={this.state.mainColor}
								bgColor={this.state.bgColor}
                                currentArtifactOnly={true}
								filter={{type: "Audio"}}
                                setCurrentFile={this.props.setCurrentFile}
                                // For Payment Buttons
								isPlayingFile={this.props.isPlayingFile}
                                buyInProgress={this.props.buyInProgress}
                                buyError={this.props.buyError}
                                paymentError={this.props.paymentError}
                                paymentInProgress={this.props.paymentInProgress}
                                payForFile={this.props.payForFile}
                                buyFile={this.props.buyFile}
                            />

						</div> : ""}
					</div>
				</div>

				<div style={{width:"102%", height: "200px", position: "absolute", bottom: "10px", marginLeft: "-10px"}}>
					<AudioVisualizer audio={this.audio} mainColor={this.state.mainColor} />
				</div>

				<div className="" style={{width:"100%", height: "40px", position: "absolute", bottom: "0px", borderTop: "1px solid " + this.state.mainColor, display: "flex", backgroundColor: this.state.bgColor}}>
					<div style={{width: "auto", height: "auto", margin: "auto", borderRight: "1px solid " + this.state.mainColor, display: "flex"}} onClick={this.toggleAudio}>
						<PlaybackControls
							isPlayable={this.props.activeFile.isPlayable}
							isPlaying={this.props.activeFile.isPlaying}
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
								'}',
								'.Icon-shape {',
								'    fill: ' + this.state.mainColor + ' !important;',
								'}',
								'.VolumeSlider {',
								'    background: ' + this.state.bgColor + ' !important;',
								'    border: 1px solid ' + this.state.mainColor + ' !important;',
								'}',
								'.VolumeSlider-value {',
								'    background: ' + this.state.mainColor + ' !important;',
								'    border: 1px solid ' + this.state.bgColor + ' !important;',
								'}'
							].join('\n')
						}} />
						<ProgressBar
							style={{width: "100%"}}
							totalTime={this.props.activeFile.duration}
							currentTime={this.props.activeFile.currentTime}
							isSeekable={this.props.activeFile.isSeekable}
							onSeek={this.onSeek}
						/>
						<span style={{mixBlendMode: "difference", color: "#fff", verticalAlign: "middle", lineHeight: "35px", marginLeft: "10px", marginTop: "-76px", display: "inline-block"}}>
							<TimeMarker
								totalTime={this.props.activeFile.duration}
								currentTime={this.props.activeFile.currentTime}
								markerSeparator=" / "
							/>
						</span>
					</div>
					<div style={{width: "45px", height: "auto", margin: "auto", borderLeft: "1px solid " + this.state.mainColor, display: "flex"}}>
						<MuteToggleButton
							isMuted={this.props.volumeControls.isMuted}
							onMuteChange={this.onMuteChange}
							isEnabled={this.props.activeFile.isPlayable}
							onHover
						/>
						<VolumeSlider
							volume={this.props.volumeControls.volume}
							onVolumeChange={this.onVolumeChange}
							isEnabled={this.props.activeFile.isPlayable}
							style={this.props.volumeControls.isMuted ? {display: "none"} : null}
						/>
					</div>
				</div>
			</div>
		);
	}
}

AudioContainer.SUPPORTED_FILE_TYPES = ["mp3", "ogg", "wav"];
AudioContainer.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    volumeControls: PropTypes.object,
    filePlaylist: PropTypes.object,
    active: PropTypes.string,
    updateFileCurrentTime: PropTypes.func,
    isPlayableFile: PropTypes.func,
    isSeekableFile: PropTypes.func,
    updateFileDuration: PropTypes.func,
    setVolume: PropTypes.func,
    setMute: PropTypes.func,
    playlistNext: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    buildIPFSShortURL: PropTypes.func,
    buildIPFSURL: PropTypes.func,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
    buyFile: PropTypes.func
};

export default AudioContainer;
