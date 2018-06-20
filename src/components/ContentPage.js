import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentContainer from './ContentContainer.js'
import ContentInfo from './ContentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './ContentCard.js'

class ContentPage extends Component {
    render() {
        return (
            <div className="content-page-container">
                <ContentContainer
                    artifact={this.props.artifact}
                    artifactState={this.props.artifactState}
                    activeFile={this.props.activeFile}
                    // For AudioContainer
                    volumeControls={this.props.volumeControls}
                    filePlaylist={this.props.filePlaylist}
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
                <div className="container-fluid content-page">
                    <div className="margin-container" style={{marginLeft: "7%", marginRight: "7%"}}>
                        <div className="row" style={{marginTop: "30px"}}>
                            <div id="media-info" className="content-info col-12 col-md-9" >
                                <ContentInfo
                                    artifact={this.props.artifact}
                                    artifactState={this.props.artifactState}
                                    activeFile={this.props.activeFile}
                                    filePlaylist={this.props.filePlaylist}
                                    payForFileFunc={this.props.payForFileFunc}
                                    buyFileFunc={this.props.buyFileFunc}
                                    isPlayingFile={this.props.isPlayingFile}
                                    setCurrentFile={this.props.setCurrentFile}
                                />
                                <br />
                                {(this.props.artifact && this.props.artifact.txid !== "") ?
                                    <div>
                                        <IssoCommentBox  addComment={this.props.addComment} url={this.props.artifact.txid} />
                                        <IssoComments
                                            artifact={this.props.artifact}
                                            artifactState={this.props.artifactState}
                                            comments={this.props.artifactState.comments}
                                        />
                                    </div>
                                    : ""}
                            </div>
                            <div id='suggested' className="suggested-content col-12 col-md-3 mt-4">
                                <h5>Suggested Content</h5>
                                {this.props.artifactList ? (this.props.artifactList.items.map(function(artifact, i){
                                    return <ContentCard
                                        key={i}
                                        artifact={artifact}
                                        styleContentCard={"small"}
                                    />
                                })) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ContentPage.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    artifactList: PropTypes.object,
    activeFile: PropTypes.object,
    volumeControls: PropTypes.object,
    filePlaylist: PropTypes.object,
    active: PropTypes.string,
    addComment: PropTypes.func,
    payForFileFunc: PropTypes.func,
    buyFileFunc: PropTypes.func,
    updateFileCurrentTime: PropTypes.func,
    isPlayableFile: PropTypes.func,
    isSeekableFile: PropTypes.func,
    updateFileDuration: PropTypes.func,
    setVolume: PropTypes.func,
    setMute: PropTypes.func,
    playlistNext: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
}

export default ContentPage;