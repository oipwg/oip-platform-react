import React, { Component } from 'react';

import {connect} from "react-redux";
import {fetchArtifactList, LATEST_CONTENT_LIST} from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js';

class Homepage extends Component {

	componentDidMount(){
		this.props.dispatch(fetchArtifactList(this.props.Core, LATEST_CONTENT_LIST));
	}

	render() {
		return (
			<ContentCardsContainer
				Core={this.props.Core}
				title={"Latest Content"}
				content={this.props.content}
			/>
		);
	}
}
function mapStateToProps(state) {
    return {
		content: state.ArtifactLists[LATEST_CONTENT_LIST],
		Core: state.Core.Core
    }
}

export default connect(mapStateToProps)(Homepage);
