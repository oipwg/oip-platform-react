import React, { Component } from 'react';

import {
  fetchArtifactList,
  SEARCH_PAGE_LIST
} from '../actions'

import ContentCardsContainer from './ContentCardsContainer.js'

class SearchPage extends Component {
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

		this.dispatchSearch = this.dispatchSearch.bind(this);
	}
	componentDidMount(){
		// Every time the state changes, log it
		this.dispatchSearch(this.props)
	}
	componentWillReceiveProps(nextProps){
		if (this.props.match.params.id !== nextProps.match.params.id)
			this.dispatchSearch(nextProps)
	}
	dispatchSearch(props){
		props.store.dispatch(fetchArtifactList(props.Core, SEARCH_PAGE_LIST, { "search-for": props.match.params.id }));
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let myNewState = newState.ArtifactLists[SEARCH_PAGE_LIST];

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
				title={"Search Results"}
				opts={this.state}
			/>
		);
	}
}

export default SearchPage;