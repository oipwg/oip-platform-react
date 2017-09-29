import React, { Component } from 'react';

import ContentContainer from './contentContainer.js'
import ContentInfo from './contentInfo.js'
import ContentComments from './contentComments.js'
import ContentCard from './contentCard.js'

class ContentPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			artifact: undefined
		}
		this.setArtifact = this.setArtifact.bind(this);
	}
	ComponentDidMount(){
		this.setArtifact(this.props);
	}
	componentWillReceiveProps(nextProps){
		this.setArtifact(nextProps);
	}
	setArtifact(props){
		let artifact = props.artifact;

		if (!props.artifact){
			if (props.all){
				for (var i = 0; i < props.all.length; i++){
					if (props.all[i].txid.substring(0,6) === props.match.params.id){
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