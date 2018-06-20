import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IssoCommentBox extends Component {
	constructor(props){
		super(props);

		this.state = {
			comment: ""
		}

		this.triggerTextInput = this.triggerTextInput.bind(this);
		this.submitPost = this.submitPost.bind(this);
	}

	triggerTextInput(){
		this.setState({comment: this.textarea.value});
	}
	submitPost(){
		if (this.state.comment !== ""){
			this.props.addComment(this.props.txid, this.state.comment);
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

IssoCommentBox.propTypes = {
    addComment: PropTypes.func,
    txid: PropTypes.string
}


export default IssoCommentBox;