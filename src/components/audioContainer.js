import React, { Component } from 'react';

import WaveSurferPlayer from './waveSurferPlayer.js';
import AudioListContainer from './audioListContainer.js';

class AudioContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {songs: [{
			src: ""
		}]};
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
	}
	render() {
		return (
			<div className="container" style={{paddingTop: "20px"}}>
				<div className="row">
					<div className="col-4"><img src={this.state.songs[0].src} style={{width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px"}} alt="" /></div>
					<div className="col-8" style={{paddingTop: "50px"}}>
						<WaveSurferPlayer />
						<div id="waveform-timeline" style={{marginBottom: "10px"}}></div>
						<div className="btn-group d-flex justify-content-center">
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-jump-to-start"></span></button>
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-fast-backward"></span></button>
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-play"></span></button>
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-paus"></span></button>
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-fast-forward"></span></button>
							<button className="btn btn-sm btn-outline-secondary btn-white"><span className="icon icon-controller-next"></span></button>
						</div>
					</div>
				</div>
				<AudioListContainer songs={this.state.songs} />
			</div>
		);
	}
}

export default AudioContainer;