import React, { Component } from 'react';
import axios from 'axios';

var ReactMarkdown = require('react-markdown');

class MarkdownContainer extends Component {
	componentDidMount(){
		var _this = this;
		let markdown;

		let files = this.props.artifact['oip-041'].artifact.storage.files;
		let mainHash = this.props.artifact['oip-041'].artifact.storage.location;

		for (var i = 0; i < files.length; i++){
			if (files[i].type === "Text" && !markdown)
				markdown = files[i];
		}

		let markdownURL = "";

		if (markdown){
			markdownURL = "https://gateway.ipfs.io/ipfs/" + mainHash + "/" + encodeURIComponent(markdown.fname);
		}

		this.serverRequest = axios
		.get(markdownURL)
		.then(function(result) {    
			_this.setState({
				markdown: result.data
			});
		});
	}
	componentWillUnmount() {
		if (this.serverRequest){
			try {
				this.serverRequest.abort();
			} catch(e){}
		}
	}
	constructor(props) {
		super(props);
		this.state = {markdown: ""};
	}
	render() {
		return (
			<div className="justify-content-center markdownContainer" style={{width: "60%", height: "100%", margin: "30px auto"}}>
				<ReactMarkdown source={this.state.markdown} />
			</div>
		);
	}
}

export default MarkdownContainer;