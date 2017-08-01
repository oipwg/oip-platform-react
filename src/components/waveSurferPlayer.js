import React, { Component } from 'react';

// https://github.com/mspae/react-wavesurfer
import Wavesurfer from 'react-wavesurfer';

class WaveSurferPlayer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			pos: 0
		};
		this.handleTogglePlay = this.handleTogglePlay.bind(this);
		this.handlePosChange = this.handlePosChange.bind(this);
	}

	handleTogglePlay() {
		this.setState({
			playing: !this.state.playing
		});
	}
	handlePosChange(e) {
		this.setState({
			pos: e.originalArgs[0]
		});
	}
	render() {
		var ctx = document.createElement('canvas').getContext('2d');
		var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
		linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
		linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');

		return (
			<div>
				<Wavesurfer
					audioFile={'/assets/audio/tiny-human.mp3'}
					pos={this.state.pos}
					onPosChange={this.handlePosChange}
					playing={this.state.playing}
					options={{
						waveColor: linGrad,
						progressColor: 'rgba(92,184,92,0.6)',
						cursorColor: '#fff',
						barWidth: 3
					}}
				/>
			</div>
		);
	}
}

export default WaveSurferPlayer;