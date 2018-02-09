import React, { Component } from 'react';

class PublisherIcon extends Component {
	constructor(props){
		super(props);

		this.state = {
			avatarSrc: ""
		}

		this.updateAvatar = this.updateAvatar.bind(this);
	}
	componentDidMount(){
		// Every time the state changes, log it
		this.updateAvatar(this.props)
	}
	componentWillReceiveProps(nextProps){
		if (this.props.id !== nextProps.id)
			this.updateAvatar(nextProps)
	}
	updateAvatar(props){
		if (!props.id)
			return;
		
		var size = props.small ? 64 : 200;
		var randomTrueFalse = isNaN(props.id.slice(17,18));
		var gender = randomTrueFalse ? "male" : "female";

		this.setState({
			avatarSrc: "https://avatars.dicebear.com/v1/" + gender + "/" + props.id + "/" + size + ".png"
		})
	}
	render() {
		return (
			<div style={this.props.style} className="userImage">
				<img style={this.props.style} src={this.state.avatarSrc} />
			</div>
		);
	}
}

export default PublisherIcon;