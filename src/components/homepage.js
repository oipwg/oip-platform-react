import React, { Component } from 'react';

import ContentCard from './contentCard.js';

class Homepage extends Component {
	render() {
		if (!this.props.suggestedContent)
			this.props.suggestedContent = [];

		return (
			<div className="container" style={{marginTop: "100px", marginBottom:"200px"}}>
				<h4 style={{marginBottom: "25px"}}>Suggested Content</h4>
				<div className="row">
					{this.props.suggestedContent.map(function(artJSON, i){
						return <ContentCard 
							artifact = {artJSON}
						/>
					})}
				</div>
			</div>
		);
	}
}

export default Homepage;