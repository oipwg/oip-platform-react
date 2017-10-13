import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './contentCard.js'

import ArtifactManager from '../modules/ArtifactManager.js';
import PlaylistManager from '../modules/PlaylistManager.js';

class ContentPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			ArtifactManager: {
				currentArtifact: {},
				currentFile: {}
			}
		}
		this.setArtifact = this.setArtifact.bind(this);

		props.setDisplayedArtifact(props.match.params.id);
	}
	componentWillMount(){
		//this.setArtifact(this.props);
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.match.params.id !== this.props.match.params.id){
			this.setArtifact(nextProps);
		}
	}
	setArtifact(props){
		props.setDisplayedArtifact(props.match.params.id)
	}
	render() {
		let _this = this;

		return (
			<div>
				<ContentContainer artifact={this.props.DisplayedArtifact} Core={this.props.Core} ArtifactManager={ArtifactManager} setCurrentFile={this.props.setCurrentFile} CurrentFile={this.props.CurrentFile} />
				<div className="container">
					<div className="row">
						<div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
							<ContentInfo artifact={this.props.DisplayedArtifact} Core={this.props.Core} ArtifactManager={ArtifactManager} setCurrentFile={this.props.setCurrentFile} />
							<br />
							{this.props.DisplayedArtifact ? 
								<div>
									<IssoCommentBox Core={this.props.Core} url={this.props.DisplayedArtifact.txid} />
									<IssoComments Core={this.props.Core} url={this.props.DisplayedArtifact.txid} />
								</div>
								: ""}
						</div>
						<div id='suggested' className="col-12 col-md-3" style={{marginTop: "30px"}}>
							{this.props.CurrentSuggestedContent.map(function(content, i){
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