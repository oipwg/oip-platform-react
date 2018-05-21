import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentContainer from './ContentContainer.js'
import ContentInfo from './ContentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './ContentCard.js'

import {
  selectCurrentArtifact,
  fetchArtifactList,
  RANDOM_ARTIFACT_LIST
} from '../actions'

class ContentPage extends Component {
    constructor(props){
        super(props);

        this.state = {}

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("GETDERIVED: ", nextProps, prevState)
        if (nextProps.match.params.id !== prevState.paramsId) {
            nextProps.selectCurrentArtifact(nextProps.Core, nextProps.match.params.id, nextProps.piwik);
            //Fetch suggested content
            nextProps.fetchArtifactList(nextProps.Core, RANDOM_ARTIFACT_LIST);
        }

        return {
            paramsId: nextProps.match.params.id
        }
    }

    render() {
        let artifactTXID = "";
        if (this.props.CurrentArtifact && this.props.CurrentArtifact.artifact) {
            artifactTXID = this.props.CurrentArtifact.artifact.txid;
        }

        return (
            <div className="content-page">
                <ContentContainer Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
                <div className="container">
                    <div className="row">
                        <div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
                            <ContentInfo Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
                            <br />
                            {(this.props.CurrentArtifact && artifactTXID !== "") ?
                                <div>
                                    <IssoCommentBox Core={this.props.Core} store={this.props.store} url={artifactTXID} />
                                    <IssoComments Core={this.props.Core} store={this.props.store} url={artifactTXID} />
                                </div>
                                : ""}
                        </div>
                        <div id='suggested' className="col-12 col-md-3" style={{marginTop: "30px"}}>
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

function mapStateToProps(state) {
    // console.log('content page, ', state)
    return {
        Core: state.Core.Core,
        NotificationSystem: state.NotificationSystem.NotificationSystem,
        ArtifactList: state.ArtifactLists[RANDOM_ARTIFACT_LIST],
        CurrentArtifact: state.CurrentArtifact
    }
}

const mapDispatchToProps = {
    selectCurrentArtifact,
    fetchArtifactList
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);