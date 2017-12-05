import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './contentCard.js'

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

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});

		this.setArtifact = this.setArtifact.bind(this);
	}
	componentDidMount(){
		this.setArtifact(this.props);
		this.props.store.dispatch(fetchArtifactList(this.props.Core, RANDOM_ARTIFACT_LIST));
	}
	componentWillReceiveProps(nextProps){
		if (this.props.match.params.id !== nextProps.match.params.id){
			this.setArtifact(nextProps);
			nextProps.store.dispatch(fetchArtifactList(nextProps.Core, RANDOM_ARTIFACT_LIST));
		}
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let myList = newState.ArtifactLists[RANDOM_ARTIFACT_LIST];

		if (!myList){
			myList = [];
		} else {
			myList = myList.items;
		}

		this.setState({CurrentArtifact, ArtifactList: myList});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	setArtifact(props){
		props.store.dispatch(selectCurrentArtifact(props.Core, props.match.params.id, props.piwik));
	}
	render() {
		let _this = this;

		let artifactTXID = "";
		if (this.state.CurrentArtifact && this.state.CurrentArtifact.artifact)
			artifactTXID = this.state.CurrentArtifact.artifact.txid;

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

export default ContentPage;