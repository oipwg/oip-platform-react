import React, { Component } from 'react';

class HTMLContainer extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}
	componentDidMount(){

	}
	render() {
		let websiteURL = this.props.Core.Artifact.getFirstHTMLURL(this.props.artifact);

		return (
			<iframe title="html_doc" style={{width:"100%", height:"100%", overflow: "hidden"}} frameBorder="0" src={websiteURL}></iframe>
		);
	}
}

export default HTMLContainer;