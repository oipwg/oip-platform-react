import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentPage from './ContentPage'

import {
    selectCurrentArtifact,
    fetchArtifactList,
    RANDOM_ARTIFACT_LIST,
    tipFunc,
    addComment,
    payForFileFunc,
    buyFileFunc,
    updateFileCurrentTime,
    isPlayableFile,
    isSeekableFile,
    updateFileDuration,
    setVolume,
    setMute,
    playlistNext
} from '../actions'

class ContentPageWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.id !== prevState.paramsId) {
            nextProps.selectCurrentArtifact(nextProps.match.params.id);
            nextProps.fetchArtifactList(RANDOM_ARTIFACT_LIST);
        }

        return {
            paramsId: nextProps.match.params.id
        }
    }

    render() {
        let artifactTXID = "";
        if (this.props.Artifact) {
            artifactTXID = this.props.Artifact.txid;
        }
        return (
            <div>
                <ContentPage
                    Artifact={this.props.Artifact}
                    ArtifactState={this.props.ArtifactState}
                    ArtifactList={this.props.ArtifactList}
                    ActiveFile={this.props.ActiveFile}
                    artifactTXID={artifactTXID}
                    addComment={this.props.addComment}
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
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        Artifact: state.CurrentArtifact.artifact,
        ArtifactState: state.CurrentArtifact,
        ArtifactList: state.ArtifactLists[RANDOM_ARTIFACT_LIST],
        ActiveFile: state.FilePlaylist[state.FilePlaylist.active],
        VolumeControls: state.VolumeControls,
        FilePlaylist: state.FilePlaylist,
        active: state.FilePlaylist.active
    }
}

const mapDispatchToProps = {
    selectCurrentArtifact,
    fetchArtifactList,
    tipFunc,
    addComment,
    payForFileFunc,
    buyFileFunc,
    // For AudioContainer
    updateFileCurrentTime,
    isPlayableFile,
    isSeekableFile,
    updateFileDuration,
    setVolume,
    setMute,
    playlistNext

}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPageWrapper)