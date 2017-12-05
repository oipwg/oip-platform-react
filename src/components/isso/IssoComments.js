import React, { Component } from 'react';

import IssoComment from './IssoComment.js'

import './isso.css';

class IssoComments extends Component {
	constructor(props){
		super(props);

		this.state = {
			comments: []
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let comments = newState.CurrentArtifact.comments;

		if (!comments)
			comments = []

		comments.sort((a,b) => {
			if (a.created > b.created){
				return -1;
			} else {
				return 1;
			}
		})

		this.setState({comments: comments});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
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