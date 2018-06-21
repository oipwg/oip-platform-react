import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Playlist from './Playlist.js';

class PlaylistScroller extends Component {
	render() {
		return (
			<div>
				<style dangerouslySetInnerHTML={{
					__html: [
						'.scrollbar {',
						'    border: 1px solid ' + this.props.mainColor + ';',
						'	 border-radius: 0.25rem;',
						'}',
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
				<div className="scrollbar" style={{height: "32vh", overflowY: "scroll", margin: "auto", marginTop: "10px", marginBottom: "100px", maxWidth: "450px"}}>
					{/*<h3 style={{color: this.props.mainColor, textAlign: "center"}}></h3>*/}
					<Playlist
						mainColor={this.props.mainColor}
						bgColor={this.props.bgColor}
						currentArtifactOnly={this.props.currentArtifactOnly}
						filter={this.props.filter}
                        artifact={this.props.artifact}
                        activeFile={this.props.activeFile}
                        filePlaylist={this.props.filePlaylist}
                        setCurrentFile={this.props.setCurrentFile}
						// For Payment Buttons
                        payForFileFunc={this.props.payForFileFunc}
                        buyFileFunc={this.props.buyFileFunc}
                        isPlayingFile={this.props.isPlayingFile}
					/>
				</div>
			</div>
		);
	}
}

PlaylistScroller.propTypes = {
    artifact: PropTypes.object,
    activeFile: PropTypes.object,
    filePlaylist: PropTypes.object,
    mainColor: PropTypes.string,
    bgColor: PropTypes.string,
    currentArtifactOnly: PropTypes.bool,
    filter: PropTypes.object,
    setCurrentFile: PropTypes.func,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    isPlayingFile: PropTypes.func
}

export default PlaylistScroller;