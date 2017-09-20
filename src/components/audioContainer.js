import React, { Component } from 'react';

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
			visualizerBars: []
		};

		this.createVisualization = this.createVisualization.bind(this)
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
					} catch(e) { }
				})
			}
		}

		let songs = this.props.Core.Artifact.getSongs(this.props.artifact);

		for (let i = 0; i < songs.length; i++){
			if (this.state.currentSongURL === ""){
				let ipfsURL = this.props.Core.util.buildIPFSURL(songs[i].location, songs[i].fname);
				this.setState({currentSongURL: ipfsURL});
			}
		}

		this.createVisualization()
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

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // console.log(freqData)
            ctx.fillStyle = '#9933ff';
            let bars = 256;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 2;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
        };
        renderFrame()
    }
	render() {
		return (
			<div className="" style={{paddingTop: "20px"}}>
				<div id="mp3_player">
                    <div id="audio_box">
                        <audio
                            ref="audio"
                            autoPlay={true}
                            controls={true}
                            //this is the link to my song url feel free to use it or replace it with your own
                            src={this.state.currentSongURL}
                            >
                            </audio>
                        </div>
                        </div>
				<div className="row">
					<div className="col-4"><img src={this.state.songs[0].src} style={{width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px"}} alt="" /></div>
				</div>
				<AudioListContainer songs={this.state.songs} />
				<canvas
	            	className="canvas-goo"
	                ref="analyzerCanvas"
	                id="analyzer"
	                style={{width:"100%", height: "200px", position: "absolute", bottom: "0px"}}
	                >
                </canvas>
			</div>
		);
	}
}

export default AudioContainer;