import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import ContentComments from './contentComments.js'
import ContentCard from './contentCard.js'

class ContentPage extends Component {
	render() {
		var artifact = this.props.artifact;

		if (!artifact){
			if (this.props.all){
				for (var i = 0; i < this.props.all.length; i++){
					if (this.props.all[i].txid.substring(0,6) === this.props.match.params.id){
						artifact = this.props.all[i];
					}
				}
			}
		}

		let _this = this;

		return (
			<div>
				<ContentContainer artifact={artifact} Core={this.props.Core} />
				<div className="container">
					<div className="row">
						<div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
							<ContentInfo artifact={artifact} Core={this.props.Core} />
							<br />
							<ContentComments />
						</div>
						<div id='suggested' className="col-12 col-md-3" style={{marginTop: "30px"}}>
							{this.props.suggestedContent.map(function(content, i){
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