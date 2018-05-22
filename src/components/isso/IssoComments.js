import React, { Component } from 'react';

import IssoComment from './IssoComment.js'

import './isso.css';
import {RANDOM_ARTIFACT_LIST} from "../../actions";

class IssoComments extends Component {
	constructor(props){
		super(props);

		this.state = {
			comments: []
		}
	}
    static getDerivedStateFromProps(nextProps, prevState) {
		let comments
        if (nextProps.CurrentArtifact.artifact.txid !== prevState.txid) {
           comments = nextProps.CurrentArtifact.comments;

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
        }

        return {
        	comments: comments,
            txid: nextProps.CurrentArtifact.artifact.txid
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

export default IssoComments;