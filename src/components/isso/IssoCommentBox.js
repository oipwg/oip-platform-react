import React, { Component } from 'react';

import { addComment } from '../../actions'

class IssoCommentBox extends Component {
	constructor(props){
		super(props);

		this.state = {
			comment: "",
			author: "",
			email: ""
		}

		this.triggerTextInput = this.triggerTextInput.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		this.setState({CurrentArtifact: CurrentArtifact});
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	triggerTextInput(){
		this.setState({comment: this.textarea.value});
	}
	submitPost(){
		let _this = this;
		if (this.state.comment !== ""){
			this.props.store.dispatch(addComment(this.props.Core, this.props.url, this.state.comment));
			this.textarea.value = "";
		}
	}
	render() {
		return (
			<div>
				<textarea ref={textarea => this.textarea = textarea} onInput={this.triggerTextInput} rows="4" name="" className="form-control"></textarea>
				<div className="btn-group" style={{float: "right", marginTop: "-30px"}}>
					{/*<button className="btn btn-sm btn-outline-success">Tip & Post</button>*/}
					<button onClick={this.submitPost} className="btn btn-sm btn-outline-info">Post</button>
				</div>
			</div>
		);
	}
}

export default IssoCommentBox;