import React, { Component } from 'react';

import {
  fetchArtifactList,
  LATEST_CONTENT_LIST
} from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js';

class Homepage extends Component {
	constructor(props){
		super(props);

		this.state = {
			isFetching: false,
			isInvalidated: false,
			error: false,
			items: []
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;
		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	setupConnection(){
		let _this = this;
		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	componentDidMount(){
		this.props.store.dispatch(fetchArtifactList(this.props.Core, LATEST_CONTENT_LIST));
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let myNewState = newState.ArtifactLists[LATEST_CONTENT_LIST];

		if (myNewState && this.state !== myNewState){
			this.setState(myNewState);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		return (
			<ContentCardsContainer
				Core={this.props.Core}
				title={"Latest Content"}
				opts={this.state}
			/>
		);
	}
}

export default Homepage;