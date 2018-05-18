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

        this.state = {
            ArtifactList: []
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("GETDERIVED: ", nextProps, prevState)
        if (nextProps.match.params.id !== prevState.paramsId) {
            nextProps.selectCurrentArtifact(nextProps.Core, nextProps.match.params.id, nextProps.piwik);
            nextProps.fetchArtifactList(nextProps.Core, RANDOM_ARTIFACT_LIST);
        }

        return {
            paramsId: nextProps.match.params.id
        }
    }

    render() {
        let _this = this;

        let artifactTXID = "";
        if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact)
            artifactTXID = this.state.CurrentArtifact.artifact.txid;

        console.log("my special props: ", this.props.ArtifactList, "current", this.props.CurrentArtifact)
        return (
            <div className="content-page">
                <ContentContainer Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
                <div className="container">
                    <div className="row">
                        <div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
                            <ContentInfo Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
                            <br />
                            {(this.state.CurrentArtifact && artifactTXID !== "") ?
                                <div>
                                    <IssoCommentBox Core={this.props.Core} store={this.props.store} url={artifactTXID} />
                                    <IssoComments Core={this.props.Core} store={this.props.store} url={artifactTXID} />
                                </div>
                                : ""}
                        </div>
                        <div id='suggested' className="col-12 col-md-3" style={{marginTop: "30px"}}>
                            <h5>Suggested Content</h5>
                            {this.state.ArtifactList.map(function(content, i){
                                return <ContentCard
                                    key={i}
                                    artifact={content}
                                    Core={_this.props.Core}
                                />
                            })}
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