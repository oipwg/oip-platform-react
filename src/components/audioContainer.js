import React, { Component } from 'react';

import ColorThief from 'color-thief-standalone'

import AudioVisualizerBars from './audioVisualizerBars.js';
import AudioListContainer from './audioListContainer.js';

class AudioContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [{
				src: ""
			}],
			currentSongURL: "",
			bgColor: "#000",
			mainColor: "#fff",
			currentSongTitle: "",
			currentSongArtist: "",
			mainSongProgress: 0,
			progBarClicked: false,
			lastProgBarDisable: 0,
			currentTime: 0,
			currentDuration: 0,
			playing: false
		};

		this.createVisualization = this.createVisualization.bind(this)
		this.onProgressBarClick = this.onProgressBarClick.bind(this)
		this.enableProgressBarScrub = this.enableProgressBarScrub.bind(this)
		this.disableProgressBarScrub = this.disableProgressBarScrub.bind(this)
		this.singleProgressBarScrub = this.singleProgressBarScrub.bind(this)
		this.toggleAudio = this.toggleAudio.bind(this)
		this.toHHMMSS = this.toHHMMSS.bind(this);
	}
	componentDidMount(){
		let thumbnailURL = this.props.Core.Artifact.getThumbnail(this.props.artifact);

		console.log(thumbnailURL);

		if (thumbnailURL !== ""){
			if (this.props.Core){
				let _this = this;
				this.props.Core.getThumbnailFromIPFS(thumbnailURL, function(srcData){
					console.log("data");
					try {
						_this.setState({songs: [{ src: srcData }]});

						let pic = new Image();
						pic.onload = function(){
							let colorThief = new ColorThief();
							let palette = colorThief.getPalette(pic, 2);
							_this.setState({bgColor: "rgb(" + palette[0].join(',') + ")"})
							_this.setState({mainColor: "rgb(" + palette[1].join(',') + ")"})
						}
						pic.src = srcData;
					} catch(e) { }
				})
			}
		}

		let songs = this.props.Core.Artifact.getSongs(this.props.artifact);

		let firstSong;
		for (let i = 0; i < songs.length; i++){
			if (!firstSong){
				firstSong = songs[i];
				let ipfsURL = this.props.Core.util.buildIPFSURL(songs[i].location, songs[i].fname);
				let title = this.props.Core.Artifact.getTitle(this.props.artifact);
				console.log(this.props.artifact);
				let artist = this.props.Core.Artifact.getArtist(this.props.artifact);
				this.setState({currentSongURL: ipfsURL, currentSongTitle: title, currentSongArtist: artist});
			}
		}

		this.createVisualization()
	}
	componentWillUnmount(){
		this.createVisualization = undefined;
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
	createVisualization(){
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        let audio = this.refs.audio;
        audio.crossOrigin = "anonymous";
        let audioSrc = context.createMediaElementSource(audio);
        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);

        let color = this.state.mainColor;

        let _this = this;
        let getLatestColorState = function(){
        	return _this.state.mainColor;
        }
        let updateSongProgress = function(){
        	try {
        		if (audio.currentTime > 0)
        			_this.setState({mainSongProgress: audio.currentTime / audio.duration * 100, currentTime: audio.currentTime, currentDuration: audio.duration, playing: !audio.paused})
        	} catch(e) {}
        }

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // console.log(freqData)
            ctx.fillStyle = getLatestColorState();
            let bars = 200;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 3;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
            updateSongProgress();
        };
        renderFrame()
    }
	render() {
		return (
			<div className="" style={{paddingTop: "20px", backgroundColor: this.state.bgColor, height: "100%", position: "relative", overflow: "hidden"}}>
                <audio
                    ref="audio"
                    autoPlay={true}
                    controls={true}
                    //this is the link to my song url feel free to use it or replace it with your own
                    src={this.state.currentSongURL}
                    style={{display: "none"}}
                    >
                </audio>
                <div style={{marginTop: "100px"}}>
                	<h3 className="text-center" style={{color: this.state.mainColor}}>{this.state.currentSongTitle} - {this.state.currentSongArtist}</h3>
					<img src={this.state.songs[0].src} style={{width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px", margin: "40px auto", display: "block"}} alt="" />
				</div>
				<div style={{width:"102%", height: "200px", position: "absolute", bottom: "10px", marginLeft: "-10px"}}>
					<canvas
		            	className="canvas-goo"
		                ref="analyzerCanvas"
		                id="analyzer"
		                style={{width:"100%", height: "200px"}}
		                >
	                </canvas>
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