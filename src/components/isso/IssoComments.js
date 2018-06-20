import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IssoComment from './IssoComment.js'

import './isso.css';

class IssoComments extends Component {
	constructor(props){
		super(props);

		this.state = {
			comments: []
		}
	}
    static getDerivedStateFromProps(nextProps) {
        let comments = nextProps.comments;
		if (!comments) {
			comments = []
		}

		comments.sort((a,b) => {
			if (a.created > b.created) {
				return -1;
			} else {
				return 1
			}
		})
        return {
        	comments: comments,
            txid: nextProps.artifact.txid
        }
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

IssoComment.propTypes = {
    artifact: PropTypes.object,
    artifactState: PropTypes.object,
    comments: PropTypes.string
}

export default IssoComments;