import React, { Component } from 'react';

import Identicons from 'identicons-react';

class UserAvatar extends Component {
	constructor(props){
		super(props);

		this.state = {
			hash: ""
		}
	}
	componentDidMount(){
		let publisher = this.props.Core.Artifact.getPublisherName(this.props.artifact);
		this.setState({
			hash: publisher
		})
	}
	componentDidUpdate(){

	}
	render() {
		return (
			<div className="avatar">
				<Identicons id={this.props.} width={48} size={5} />
			</div>
		);
	}
}

export default UserAvatar;