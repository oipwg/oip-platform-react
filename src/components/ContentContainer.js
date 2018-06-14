import React, { Component } from 'react';

import Spinner from 'react-spinkit';

import FileViewer from './FileViewer.js';

import Paywall from './Paywall.js';

class ContentContainer extends Component {
	render() {
		let loading = false, haveLoadedState = false;

		if (this.props.ActiveFile) {
            if (this.props.ActiveFile.info){
                haveLoadedState = true;
            }
		}


		if (this.props.Artifact && this.props.ArtifactState.isFetching) {
            loading = true;
		}

		return (
			<div className="content-container">
				<div id='content' ref={content => this.content = content}
					className={ (this.props.ActiveFile && this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned) ? "content blur" : "content"}
					style=	  { (this.props.ActiveFile && this.props.ActiveFile.isPaid && !this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned) ? {overflow: "scroll"} : {}}
				>
					{ (!haveLoadedState || loading) ? <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}} className="spinner-container"><Spinner name="wave" color="aqua" /></div> : ''}
					<FileViewer
						Artifact={this.props.Artifact}
						ArtifactState={this.props.ArtifactState}
						ActiveFile={this.props.ActiveFile}
						// For AudioContainer
                        VolumeControls={this.props.VolumeControls}
                        FilePlaylist={this.props.FilePlaylist}
                        active={this.props.active}
						// Dispatch function for AudioContainer
                        updateFileCurrentTime={this.props.updateFileCurrentTime}
                        isPlayableFile={this.props.isPlayableFile}
                        isSeekableFile={this.props.isSeekableFile}
                        updateFileDuration={this.props.updateFileDuration}
                        setVolume={this.props.setVolume}
                        setMute={this.props.setMute}
                        playlistNext={this.props.playlistNext}
						isPlayingFile={this.props.isPlayingFile}
                        setCurrentFile={this.props.setCurrentFile}
						// For Payment Buttons
                        payForFileFunc={this.props.payForFileFunc}
                        buyFileFunc={this.props.buyFileFunc}
					/>
				</div>

				<Paywall
					ActiveFile={this.props.ActiveFile}
                    Artifact={this.props.Artifact}
					ArtifactState={this.props.ArtifactState}
                    payForFileFunc={this.props.payForFileFunc}
                    buyFileFunc={this.props.buyFileFunc}
                    setCurrentFile={this.props.setCurrentFile}
				/>
			</div>
		);
	}
}

export default ContentContainer;