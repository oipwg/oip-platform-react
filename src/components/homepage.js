import React, { Component } from 'react';

import {
  fetchArtifactList,
  LATEST_CONTENT_LIST
} from '../actions'

import ContentCard from './contentCard.js';

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
	componentDidMount(){
		// Every time the state changes, log it
		// Note that subscribe() returns a function for unregistering the listener
		let _this = this;

		// Dispatch some actions
		this.props.store.dispatch(fetchArtifactList(this.props.Core, LATEST_CONTENT_LIST));
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let myNewState = newState.ArtifactLists[LATEST_CONTENT_LIST];

		if (myNewState && this.state !== myNewState){
			this.setState(myNewState);
		}
	}
	render() {
		let _this = this;

		return (
			<div className="container" style={{marginTop: "100px", marginBottom:"200px"}}>
				<h4 style={{marginBottom: "25px"}}>Latest Artifacts</h4>
				<div className="row">
					{this.state.items.map(function(artJSON, i){
						return <ContentCard 
							key = {i}
							artifact = {artJSON}
							Core = {_this.props.Core}
						/>
					})}
				</div>
			</div>
		);
	}
}

export default Homepage;