import React, { Component } from 'react';

import ContentContainer from './ContentContainer.js'
import ContentInfo from './ContentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './ContentCard.js'

class ContentPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="content-page">
                <ContentContainer
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
                />
                <div className="container">
                    <div className="row" style={{marginTop: "30px"}}>
                        <div id="media-info" className="col-12 col-md-9" >
                            <ContentInfo
                                Artifact={this.props.Artifact}
                                ArtifactState={this.props.ArtifactState}
                                ActiveFile={this.props.ActiveFile}
                            />
                            <br />
                            {(this.props.Artifact && this.props.Artifact.txid !== "") ?
                                <div>
                                    <IssoCommentBox  addComment={this.props.addComment} url={this.props.Artifact.txid} />
                                    <IssoComments
                                        Artifact={this.props.Artifact}
                                        ArtifactState={this.props.ArtifactState}
                                        comments={this.props.ArtifactState.comments}
                                    />
                                </div>
                                : ""}
                        </div>
                        <div id='suggested' className="col-12 col-md-3">
                            <h5>Suggested Content</h5>
                            {this.props.ArtifactList ? (this.props.ArtifactList.items.map(function(content, i){
                                return <ContentCard
                                    key={i}
                                    artifact={content}
                                />
                            })) : (null)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentPage;