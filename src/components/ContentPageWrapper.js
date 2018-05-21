import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    selectCurrentArtifact,
    fetchArtifactList,
    RANDOM_ARTIFACT_LIST
} from '../actions'

class ContentPageWrapper extends Component {
    constructor(props){
        super(props);

        this.state = {}

    }

    render() {
        return (

        )
    }
}

function mapStateToProps(state) {
    // console.log('content page, ', state)
    return {
        Core: state.Core.Core,
        NotificationSystem: state.NotificationSystem.NotificationSystem,
        ArtifactList: state.ArtifactLists[RANDOM_ARTIFACT_LIST],
        CurrentArtifact: state.CurrentArtifact,
        piwik: state.Piwik.piwik
    }
}

const mapDispatchToProps = {
    selectCurrentArtifact,
    fetchArtifactList
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPageWrapper);