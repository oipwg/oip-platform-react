import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentPage from './ContentPage'

import {setVolume, setMute} from "../actions/VolumeControls/actions";
import {RANDOM_ARTIFACT_LIST} from "../actions/ArtifactLists/actions";
import {fetchArtifactList} from "../actions/ArtifactLists/thunks";
import {selectCurrentArtifact, addComment} from "../actions/CurrentArtifact/thunks";
import {playlistNext, setCurrentFile} from "../actions/FilePlaylist/thunks";
import {
    updateFileCurrentTime,
    isPlayingFile,
    isPlayableFile,
    isSeekableFile,
    updateFileDuration,
    buyInProgress,
    buyError,
    paymentError,
    paymentInProgress,
    payForFile,
    buyFile
} from "../actions/FilePlaylist/actions";

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
        if (this.props.artifact) {
            artifactTXID = this.props.artifact.txid;
        }
        return (
            <div>
                <ContentPage
                    artifact={this.props.artifact}
                    artifactState={this.props.artifactState}
                    artifactList={this.props.artifactList}
                    activeFile={this.props.activeFile}
                    artifactTXID={artifactTXID}
                    addComment={this.props.addComment}
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
                    buyInProgress={this.props.buyInProgress}
                    buyError={this.props.buyError}
                    paymentError={this.props.paymentError}
                    paymentInProgress={this.props.paymentInProgress}
                    payForFile={this.props.payForFile}
                    buyFile={this.props.buyFile}
                />
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        state: state,
        artifact: state.CurrentArtifact.artifact,
        artifactState: state.CurrentArtifact,
        artifactList: state.ArtifactLists[RANDOM_ARTIFACT_LIST],
        activeFile: state.FilePlaylist[state.FilePlaylist.active],
        volumeControls: state.VolumeControls,
        filePlaylist: state.FilePlaylist,
        active: state.FilePlaylist.active
    }
}

const mapDispatchToProps = {
    selectCurrentArtifact,
    fetchArtifactList,
    addComment,
    updateFileCurrentTime,
    isPlayableFile,
    isSeekableFile,
    updateFileDuration,
    setVolume,
    setMute,
    playlistNext,
    isPlayingFile,
    setCurrentFile,
    buyInProgress,
    buyError,
    paymentError,
    paymentInProgress,
    payForFile,
    buyFile
}

ContentPageWrapper.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    artifactList: PropTypes.object,
    activeFile: PropTypes.object,
    volumeControls: PropTypes.object,
    filePlaylist: PropTypes.object,
    active: PropTypes.string,
    selectCurrentArtifact: PropTypes.func,
    fetchArtifactList: PropTypes.func,
    addComment: PropTypes.func,
    updateFileCurrentTime: PropTypes.func,
    isPlayableFile: PropTypes.func,
    isSeekableFile: PropTypes.func,
    updateFileDuration: PropTypes.func,
    setVolume: PropTypes.func,
    setMute: PropTypes.func,
    playlistNext: PropTypes.func,
    isPlayingFile: PropTypes.func,
    setCurrentFile: PropTypes.func,
    buyInProgress: PropTypes.func,
    buyError: PropTypes.func,
    paymentError: PropTypes.func,
    paymentInProgress: PropTypes.func,
    payForFile: PropTypes.func,
    buyFile: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPageWrapper)