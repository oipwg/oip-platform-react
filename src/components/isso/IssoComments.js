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
		this.getComments();
	}
	getComments(){
		let _this = this;
		this.props.Core.Comments.get(this.props.url, function(res){
			if (res && res.data && res.data.replies)
				_this.setState({comments: res.data.replies})
		})

		this.props.Core.Comments.add(this.props.url, "Hi Oliver!", function(res){
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