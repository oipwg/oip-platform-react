import React, { Component } from 'react';

import ContentCard from './contentCard.js';

class Homepage extends Component {
	render() {
		let _this = this;

		return (
			<div className="container" style={{marginTop: "100px", marginBottom:"200px"}}>
				<h4 style={{marginBottom: "25px"}}>Latest Artifacts</h4>
				<div className="row">
					{this.props.CurrentSuggestedContent.map(function(artJSON, i){
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