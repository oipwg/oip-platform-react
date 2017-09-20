import React, { Component } from 'react';

class AudioVisualizerBars extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="visualizerSpectrumContainer">
				<div className="visualizerSpectrum">
					{this.props.bars.map(function(bar, i){
						return <div class="bar" map={i} style={{backgroundColor: bar.color, transform: bar.transform}}></div>
					})}
				</div>
			</div>
		);
	}
}

export default AudioVisualizerBars;