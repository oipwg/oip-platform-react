import React, { Component } from 'react';

import ContentCard from './contentCard.js'

class SearchPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			searchResults: []
		}

		this.searchAndSet = this.searchAndSet.bind(this);
	}
	componentDidMount(){
		this.searchAndSet(this.props);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.match.params.id !== nextProps.match.params.id)
			this.searchAndSet(nextProps);
	}
	searchAndSet(props){
		let _this = this;

		props.Core.Index.search(props.match.params.id, function(results){
			_this.setState({searchResults: results.artifacts});
		});
	}
	render() {
		let _this = this;

		return (
			<div className="container" style={{marginTop: "100px", marginBottom:"200px"}}>
				<h4 style={{marginBottom: "25px"}}>Search Results</h4>
				<div className="row">
					{this.state.searchResults.map(function(artifact, i){
						return <ContentCard 
								key = {i}
								artifact = {artifact}
								Core = {_this.props.Core}
							/>
					})}
				</div>
			</div>
		);
	}
}

export default SearchPage;