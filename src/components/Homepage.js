import React, { Component } from 'react';

import {connect} from "react-redux";
import {fetchArtifactList, LATEST_CONTENT_LIST} from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js';

class Homepage extends Component {

	componentDidMount(){
		this.props.dispatch(fetchArtifactList(LATEST_CONTENT_LIST));
	}

	render() {
		return (
			<ContentCardsContainer
				title={"Latest Content"}
				content={this.props.content}
			/>
		);
	}
}
function mapStateToProps(state) {
    return {
		content: state.ArtifactLists[LATEST_CONTENT_LIST]
    }
}

export default connect(mapStateToProps)(Homepage);
