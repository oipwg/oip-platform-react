import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import IssoCommentBox from './isso/IssoCommentBox.js'
import IssoComments from './isso/IssoComments.js'
import ContentCard from './contentCard.js'

class ContentPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			artifact: undefined
		}
		this.setArtifact = this.setArtifact.bind(this);

		this.setArtifact(this.props);
	}
	componentWillMount(){
		this.setArtifact(this.props);
	}
	componentWillReceiveProps(nextProps){
		this.setArtifact(nextProps);
	}
	setArtifact(props){
		let artifact = props.artifact;

		if (!props.artifact || !props.artifact.txid.substring(0,6) === props.match.params.id){
			if (props.all){
				for (var i = 0; i < props.all.length; i++){
					if (props.all[i].txid.substring(0,6) === props.match.params.id){
						console.log("Yep");
						artifact = props.all[i];
					}
				}
			}
		}

		this.setState({artifact: artifact});
	}
	render() {
		let _this = this;

		return (
			<div>
				<ContentContainer artifact={this.state.artifact} Core={this.props.Core} />
				<div className="container">
					<div className="row">
						<div id="media-info" className="col-12 col-md-9" style={{marginTop: "30px"}}>
							<ContentInfo artifact={this.state.artifact} Core={this.props.Core} />
							<br />
							{this.state.artifact ? 
								<div>
									<IssoCommentBox Core={this.props.Core} url={this.state.artifact.txid} />
									<IssoComments Core={this.props.Core} url={this.state.artifact.txid} />
								</div>
								: ""}
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