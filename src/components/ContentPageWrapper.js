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
    buyFileFunc
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
            console.log(artifactTXID)
        }

        return (
            <div>
                <ContentPage
                    Artifact={this.props.Artifact}
                    ArtifactState={this.props.ArtifactState}

                    ArtifactList={this.state.ArtifactList}
                    ActiveFile={this.state.ActiveFile}
                    artifactTXID={artifactTXID}
                    addComment={this.props.addComment}
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
        ActiveFile: state.FilePlaylist[state.FilePlaylist.active]
    }
}

const mapDispatchToProps = {
    selectCurrentArtifact,
    fetchArtifactList,
    tipFunc,
    addComment,
    payForFileFunc,
    buyFileFunc
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPageWrapper)