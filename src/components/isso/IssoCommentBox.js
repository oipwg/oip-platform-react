import React, { Component } from 'react';

class IssoCommentBox extends Component {
	render() {
		return (
			<div>
				<textarea rows="3" name="" className="form-control"></textarea>
				<div className="btn-group" style={{float: "right", marginTop: "-27px"}}>
					<button className="btn btn-sm btn-outline-success">Tip & Post</button>
					<button className="btn btn-sm btn-outline-info">Post</button>
				</div>
			</div>
		);
	}
}

export default IssoCommentBox;