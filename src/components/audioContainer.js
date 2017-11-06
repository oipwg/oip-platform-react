import React, { Component } from 'react';

import ColorThief from 'color-thief-standalone';

import AudioVisualizer from './AudioVisualizer.js';
import PlaylistScroller from './PlaylistScroller.js';
import IPFSImage from './IPFSImage.js';

class AudioContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SongList: {

			},
			thumbnailSrc: "",
			bgColor: "#000",
			mainColor: "#fff",
			currentSongTitle: "",
			currentSongArtist: "",
			mainSongProgress: 0,
			progBarClicked: false,
			lastProgBarDisable: 0,
			currentTime: 0,
			currentDuration: 0,
			playing: false,
			updateVisualization: true
		};

		this.onProgressBarClick = this.onProgressBarClick.bind(this)
		this.enableProgressBarScrub = this.enableProgressBarScrub.bind(this)
		this.disableProgressBarScrub = this.disableProgressBarScrub.bind(this)
		this.singleProgressBarScrub = this.singleProgressBarScrub.bind(this)
		this.updateThumbnail = this.updateThumbnail.bind(this)
		this.updateSong = this.updateSong.bind(this)
		this.toggleAudio = this.toggleAudio.bind(this)
		this.toHHMMSS = this.toHHMMSS.bind(this);
		this.nextSong = this.nextSong.bind(this);

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
			let updateSong = this.updateSong;
			this.setState(stateObj, () => {
				updateSong();
			});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
	}
	componentWillReceiveProps(nextProps, nextState){
		//this.updateThumbnail(nextProps);
		//this.updateSong();
	}
	shouldComponentUpdate(nextProps, nextState){
		if (this.state.ActiveFile === nextState.ActiveFile && !this.state.ActiveFile.hasPaid && nextState.ActiveFile.hasPaid){
			try {
				//this.refs.audio.play()
			} catch(e){}
		}

		if (this.state.ActiveFile && this.state.ActiveFile.info && this.state.ActiveFile.info !== nextState.ActiveFile.info){
			let songURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(nextState.CurrentArtifact.artifact, nextState.ActiveFile.info));

			//this.setState({currentSongURL: songURL});
		}

		return true;
	}
	updateThumbnail(state){
		let thumbnailURL = "";

		if (state.CurrentArtifact && state.CurrentArtifact.artifact){
			thumbnailURL = this.props.Core.Artifact.getThumbnail(state.CurrentArtifact.artifact);
		}

		if (thumbnailURL !== ""){
			if (this.props.Core){
				let _this = this;
				this.props.Core.Network.getThumbnailFromIPFS(this.props.Core.util.buildIPFSShortURL(state.CurrentArtifact.artifact, thumbnailURL), function(srcData){
					try {
						_this.setState({thumbnailSrc: srcData });

						let pic = new Image();
						pic.onload = function(){
							try {
								let colorThief = new ColorThief();
								let palette = colorThief.getPalette(_this.refs.image, 2);
								_this.setState({bgColor: "rgb(" + palette[0].join(',') + ")"})
								_this.setState({mainColor: "rgb(" + palette[1].join(',') + ")"})
								pic = undefined;
							} catch (e) { }
						}
						pic.src = srcData;
					} catch(e) { }
				})
			}
		} else {
			this.setState({bgColor: "#000"})
			this.setState({mainColor: "#fff"})
			this.setState({songs: [{ src: "" }]});
		}
	}
	updateSong(){
		let songs = this.props.Core.Artifact.getSongs(this.state.CurrentArtifact.artifact);

		let firstSong;
		for (let i = 0; i < songs.length; i++){
			if (!firstSong){
				firstSong = songs[i];
				let ipfsURL = this.props.Core.util.buildIPFSURL(songs[i].location, songs[i].fname);
				let title = this.props.Core.Artifact.getTitle(this.state.CurrentArtifact.artifact);
				let artist = this.props.Core.Artifact.getArtist(this.state.CurrentArtifact.artifact);

				let audio = this.refs.audio;

				this.setState({currentSongURL: ipfsURL, currentSongTitle: title, currentSongArtist: artist}, function(){
					//audio.src = ipfsURL;
				});
			}
		}
	}
	toggleAudio(event){
		if (this.state.playing){
			this.refs.audio.pause();
		} else {
			this.refs.audio.play();
		}
	}
	enableProgressBarScrub(event){
		this.setState({progBarClicked: true})
		this.onProgressBarClick(event);
	}
	singleProgressBarScrub(event){
		this.setState({progBarClicked: true})
		this.onProgressBarClick(event);
		this.setState({progBarClicked: false, lastProgBarDisable: 0})
	}
	disableProgressBarScrub(){
		if (this.state.progBarClicked)
			this.setState({progBarClicked: false, lastProgBarDisable: Date.now()})	
	}
	onProgressBarClick(event){
		if (this.state.progBarClicked || Date.now() - this.state.lastProgBarDisable <= 500){
			let xClickLocation = event.clientX;
			let playButtonWidth = 40;
			let volumeButtonWidth = 40;
			let screenWidth = window.innerWidth;

			let overallWidth = screenWidth - playButtonWidth - volumeButtonWidth;

			let onePercent = overallWidth / 100;

			let offsetClickX = xClickLocation - playButtonWidth;

			let percentClick = offsetClickX / onePercent;

			if (percentClick < 0)
				percentClick = 0;
			else if (percentClick > 100)
				percentClick = 100;

			let onePercentOfSong = this.refs.audio.duration / 100;

			let songSecondAtPercent = onePercentOfSong * percentClick;

			if (this.refs.audio && !isNaN(songSecondAtPercent)){
				this.refs.audio.currentTime = songSecondAtPercent;
			}
		}	
	}
	toHHMMSS(numToSecond) {
	    var sec_num = parseInt(numToSecond, 10); // don't forget the second param
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10 && hours > 0) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}

	    if (hours > 0){
	    	return hours+':'+minutes+':'+seconds;
	    } else {
	    	return minutes+':'+seconds;
	    }
	}
	nextSong(){
		let songs = this.props.SongList;
		let setNextSong = false;
		let haveSetNextSong = false;

		for (var i = 0; i < songs.length; i++) {
			if (setNextSong && !haveSetNextSong){
				this.props.setCurrentFile(songs[i])
				haveSetNextSong = true;
			}
			if (songs[i].fname === this.props.CurrentFile.fname){
				setNextSong = true;
			}
		}
	}
	render() {
		let name, artist, playlistLen = 0, paywall = false, ipfsHash = "";

		if (this.state.ActiveFile && this.state.ActiveFile.info){
			name = this.state.ActiveFile.info.dname ? this.state.ActiveFile.info.dname : this.state.ActiveFile.info.fname;
			paywall = ((this.state.ActiveFile.isPaid && !this.state.ActiveFile.hasPaid) || (!this.state.ActiveFile.owned && this.state.ActiveFile.isPaid))

			if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact){
				ipfsHash = this.props.Core.util.buildIPFSShortURL(this.state.CurrentArtifact.artifact, this.props.Core.Artifact.getThumbnail(this.state.CurrentArtifact.artifact));
			}
		}
		if (this.state.FilePlaylist){
			playlistLen = this.state.FilePlaylist.length - 1;
		}
		
		return (
			<div className="" style={{paddingTop: "20px", backgroundColor: this.state.bgColor, height: "100%", position: "relative", overflow: "hidden"}}>
                <audio
                    ref="audio"
                    autoPlay={false}
                    controls={true}
                    //this is the link to my song url feel free to use it or replace it with your own
                    src={this.state.currentSongURL}
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
								<IPFSImage Core={this.props.Core} hash={ipfsHash} />
							</div>
						</div>
						{playlistLen > 1 ? 
						<div className="col-6" style={{margin: "auto"}}>
							<PlaylistScroller />
						</div> : ""}
					</div>
				</div>
				<div style={{width:"102%", height: "200px", position: "absolute", bottom: "10px", marginLeft: "-10px"}}>
					<AudioVisualizer audio={this.refs.audio} />
                </div>
                <div style={{width:"100%", height: "40px", position: "absolute", bottom: "0px", borderTop: "1px solid " + this.state.mainColor, display: "flex", backgroundColor: this.state.bgColor}}>
                	<div style={{width: "40px", height: "100%", borderRight: "1px solid " + this.state.mainColor, display: "flex"}} onClick={this.toggleAudio}><span onClick={this.toggleAudio} className={this.state.playing ? "icon icon-controller-paus" : "icon icon-controller-play"} style={{fontSize: "25px", color: this.state.mainColor, margin:"auto auto"}}></span></div>
                	<div style={{width: "100%"}} onClick={this.singleProgressBarScrub} onMouseDown={this.enableProgressBarScrub} onMouseMove={this.onProgressBarClick} onMouseUp={this.disableProgressBarScrub} onMouseOut={this.disableProgressBarScrub}>
                		<div style={{height: "100%", width: this.state.mainSongProgress + "%", backgroundColor: this.state.mainColor, border: "1px solid " + this.state.bgColor}} onClick={this.singleProgressBarScrub} onMouseDown={this.enableProgressBarScrub} onMouseMove={this.onProgressBarClick} onMouseUp={this.disableProgressBarScrub} onMouseOut={this.disableProgressBarScrub}>
                			<span style={{mixBlendMode: "difference", color: "#fff", verticalAlign: "middle", lineHeight: "35px", marginLeft: "10px"}}>{this.toHHMMSS(this.state.currentTime)}/{this.toHHMMSS(this.state.currentDuration)}</span>
                		</div>
                	</div>
                	<div style={{width: "40px", height: "100%", borderLeft: "1px solid " + this.state.mainColor, display: "flex"}}><span className="icon icon-sound" style={{fontSize: "25px", color: this.state.mainColor, margin:"auto auto"}}></span></div>
                </div>
			</div>
		);
	}
}

export default AudioContainer;