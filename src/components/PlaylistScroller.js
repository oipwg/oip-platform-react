import React, { Component } from 'react';

import Playlist from './Playlist.js';

class PlaylistScroller extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let currentFile = newState.FilePlaylist[active];

		if (currentFile && this.state !== currentFile){
			this.setState({CurrentArtifact: CurrentArtifact, ActiveFile: currentFile});
		}
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		return (
			<div>
				<style dangerouslySetInnerHTML={{
					__html: [
						'.scrollbar::-webkit-scrollbar {',
						'    background-color: ' + this.state.mainColor + ';',
						'}',
						'.scrollbar::-webkit-scrollbar-thumb {',
						'    background-color: ' + this.state.mainColor + ';',
						'}',
						'.scrollbar::-webkit-scrollbar-track {',
						'    background-color: ' + this.state.bgColor + ';',
						'}'
					].join('\n')
				}} />
				<div className="scrollbar" style={{height: "400px", overflowY: "scroll", margin: "auto", maxWidth: "450px"}}>
					<h3 style={{color: this.state.mainColor, textAlign: "center"}}>
					</h3>
					<Playlist 
						Core={this.props.Core} 
						store={this.props.store}
						currentArtifactOnly={true}
						mainColor={this.state.mainColor}
						bgColor={this.state.bgColor}
					/>
				</div>
			</div>
		);
	}
}

export default PlaylistScroller;