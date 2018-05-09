import React, { Component } from 'react';

import ContentCard from './contentCard.js'

class ContentCardsContainer extends Component {
	render() {
		let _this = this;

		return (
			<div className="content-cards-container container">
				<h4 >{this.props.title}</h4>
				{this.props.opts.isFetching ? <p>Loading...</p> : ""}
				{this.props.opts.error ? <p>Oops! Looks like something went wrong...</p> : ""}
				<div className="row">
					{(this.props.opts.items && this.props.opts.items.length > 0) ? this.props.opts.items.map(function(artifact, i){
						return <ContentCard 
								key = {i}
								artifact = {artifact}
								Core = {_this.props.Core}
							/>
					}) : ""}
				</div>
			</div>
		);
	}
}

export default ContentCardsContainer;