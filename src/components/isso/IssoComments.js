import React, { Component } from 'react';

import IssoComment from './IssoComment.js'

import './isso.css';

class IssoComments extends Component {
	constructor(props){
		super(props);

		this.state = {
			comments: []
		}

		this.getComments = this.getComments.bind(this);
	}
	componentDidMount(){
		this.getComments(this.props);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.url !== nextProps.url){
			this.getComments(nextProps);
		}
	}
	getComments(props){
		let _this = this;
		props.Core.Comments.get(props.url, function(res){
			if (res && res.data && res.data.replies)
				_this.setState({comments: res.data.replies})
			else
				_this.setState({comments: []})
		})

		props.Core.Comments.add(props.url, "Hi Oliver!", function(res){
			if (res && res.data && res.data.replies)
				_this.setState({comments: res.data.replies})
		})
	}
	render() {
		return (
			<div id="isso-root">
				{this.state.comments.map(function(comment, i){
					return <IssoComment comment={comment} key={i} />
				})}
			</div>
		);
	}
}

export default IssoComments;