import React, { Component } from 'react';

import Playlist from './Playlist.js';

class PlaylistScroller extends Component {
	render() {
		return (
			<div>
				<style dangerouslySetInnerHTML={{
					__html: [
						'.scrollbar::-webkit-scrollbar {',
						'    background-color: ' + this.props.mainColor + ';',
						'}',
						'.scrollbar::-webkit-scrollbar-thumb {',
						'    background-color: ' + this.props.mainColor + ';',
						'}',
						'.scrollbar::-webkit-scrollbar-track {',
						'    background-color: ' + this.props.bgColor + ';',
						'}'
					].join('\n')
				}} />
				<div className="scrollbar" style={{height: "400px", overflowY: "scroll", margin: "auto", maxWidth: "450px"}}>
					{/*<h3 style={{color: this.props.mainColor, textAlign: "center"}}></h3>*/}
					<Playlist 
						Core={this.props.Core} 
						store={this.props.store}
						mainColor={this.props.mainColor}
						bgColor={this.props.bgColor}
						currentArtifactOnly={this.props.currentArtifactOnly}
						filter={this.props.filter}
					/>
				</div>
			</div>
		);
	}
}

export default PlaylistScroller;